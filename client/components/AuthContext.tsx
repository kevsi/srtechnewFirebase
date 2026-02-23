import React, { createContext, useContext, useEffect, useState } from "react";
import { isFirebaseEnabled, initializeFirebase, getFirebaseInstances } from "@/lib/firebase";

type User = {
  uid?: string;
  email: string;
  name?: string;
  verified?: boolean;
  isAdmin?: boolean;
};

type OnboardingData = {
  role?: string;
  age?: string;
};

type AuthContextValue = {
  user: User | null;
  onboarding: OnboardingData | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  saveOnboarding: (data: OnboardingData) => Promise<void> | void;
  sendVerification: (email: string) => Promise<string>;
  verifyCode: (email: string, code: string) => Promise<boolean>;
  isAdmin: () => boolean;
  refreshUser: () => Promise<void>;
  sessionExpiry: number | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);

  // Session timeout: 1 hour in milliseconds
  const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour

  // Check session validity
  useEffect(() => {
    const checkSession = () => {
      const expiry = localStorage.getItem('_session_expiry');
      if (expiry && parseInt(expiry) < Date.now()) {
        // Session expired, logout
        logout();
      } else {
        setSessionExpiry(parseInt(expiry));
      }
    };

    checkSession();

    // Check every minute
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, []);

  // Extend session on user activity
  useEffect(() => {
    const extendSession = () => {
      if (user && sessionExpiry) {
        const newExpiry = Date.now() + SESSION_TIMEOUT;
        localStorage.setItem('_session_expiry', newExpiry.toString());
        setSessionExpiry(newExpiry);
      }
    };

    // Extend session on user activity (click, keypress, scroll)
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, extendSession, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, extendSession);
      });
    };
  }, [user, sessionExpiry]);

  useEffect(() => {
    let unsub: any = null;
    try {
      const init = async () => {
        console.log("Firebase enabled:", isFirebaseEnabled);
        if (isFirebaseEnabled) {
          const { auth: fbAuth, db: fbDb, googleProvider, error } = await initializeFirebase();
          if (error) {
            console.error("Firebase initialization error:", error);
          }
          console.log("Firebase auth:", fbAuth, "db:", fbDb);
          if (fbAuth && fbDb) {
            const { onAuthStateChanged } = await import('firebase/auth');
            unsub = onAuthStateChanged(fbAuth, async (fbUser: any) => {
              if (fbUser) {
                const baseUser: User = {
                  uid: fbUser.uid,
                  email: fbUser.email ?? "",
                  name: fbUser.displayName ?? undefined,
                  verified: fbUser.emailVerified,
                  isAdmin: false,
                };

                try {
                  const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');

                  // Charger ou créer les données utilisateur dans Firestore
                  const userRef = doc(fbDb, "users", fbUser.uid);
                  console.log("Fetching user from Firestore:", fbUser.uid);
                  const userSnap = await getDoc(userRef);
                  console.log("User snap exists:", userSnap.exists(), userSnap.data());

                  if (userSnap.exists()) {
                    const userData = userSnap.data();
                    // Accepter soit boolean true soit string "true"
                    baseUser.isAdmin = userData.isAdmin === true || userData.isAdmin === 'true';
                    baseUser.name = userData.name || baseUser.name;
                    console.log("User isAdmin set to:", baseUser.isAdmin);
                  } else {
                    // Ne pas définir isAdmin ici - il sera défini manuellement dans Firestore
                    await setDoc(userRef, {
                      email: fbUser.email,
                      name: fbUser.displayName || null,
                      verified: fbUser.emailVerified,
                      createdAt: serverTimestamp(),
                      updatedAt: serverTimestamp(),
                    });
                    baseUser.isAdmin = false;
                  }

                  // Charger l'onboarding
                  const onboardingRef = doc(fbDb, "onboardings", fbUser.uid);
                  const onboardingSnap = await getDoc(onboardingRef);
                  if (onboardingSnap.exists()) {
                    const data = onboardingSnap.data() as OnboardingData;
                    setOnboarding(data);
                    localStorage.setItem("_auth_onboarding", JSON.stringify(data));
                  }
                } catch (e) {
                  console.error("Failed to load user data from Firestore", e);
                }

                setUser(baseUser);
                localStorage.setItem("_auth_user", JSON.stringify(baseUser));
                
                // Set session expiry (1 hour from now)
                const expiry = Date.now() + SESSION_TIMEOUT;
                localStorage.setItem('_session_expiry', expiry.toString());
                setSessionExpiry(expiry);
              } else {
                const rawUser = localStorage.getItem("_auth_user");
                const rawOnb = localStorage.getItem("_auth_onboarding");
                if (rawUser) setUser(JSON.parse(rawUser));
                if (rawOnb) setOnboarding(JSON.parse(rawOnb));
              }
            });
          }
        } else {
          const rawUser = localStorage.getItem("_auth_user");
          const rawOnb = localStorage.getItem("_auth_onboarding");
          const rawExpiry = localStorage.getItem("_session_expiry");
          if (rawUser) setUser(JSON.parse(rawUser));
          if (rawOnb) setOnboarding(JSON.parse(rawOnb));
          if (rawExpiry) setSessionExpiry(parseInt(rawExpiry));
        }
      };
      void init();
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    if (isFirebaseEnabled && password) {
      const { auth: fbAuth } = await initializeFirebase();
      if (fbAuth) {
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        await signInWithEmailAndPassword(fbAuth, email, password);
        return;
      }
    }
    const raw = localStorage.getItem("_auth_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      setUser(parsed);
      return;
    }
    const u = { email, verified: true, isAdmin: false };
    setUser(u);
    localStorage.setItem("_auth_user", JSON.stringify(u));
  };

  const signup = async (email: string, password?: string) => {
    if (isFirebaseEnabled && password) {
      const { auth: fbAuth } = await initializeFirebase();
      if (fbAuth) {
        const { createUserWithEmailAndPassword, sendEmailVerification } = await import('firebase/auth');
        const cred = await createUserWithEmailAndPassword(fbAuth, email, password);
        if (cred.user) {
          await sendEmailVerification(cred.user);
        }
        return;
      }
    }
    const u = { email, verified: false, isAdmin: false };
    setUser(u);
    localStorage.setItem("_auth_user", JSON.stringify(u));
    await sendVerification(email);
  };

  const loginWithGoogle = async () => {
    if (isFirebaseEnabled) {
      const { auth: fbAuth, googleProvider } = await initializeFirebase();
      if (fbAuth && googleProvider) {
        const { signInWithPopup } = await import('firebase/auth');
        try {
          await signInWithPopup(fbAuth, googleProvider);
          return;
        } catch (e) {
          console.error('Google sign-in failed', e);
        }
      }
    }

    try {
      let email: string | null = null;
      if (typeof window.prompt === 'function') {
        try { email = window.prompt('Enter Google email to sign in (demo)'); } catch { email = null; }
      }
      if (!email) {
        const ts = Date.now();
        email = `google-demo+${ts}@local.invalid`;
      }
      const userFromGoogle = { email, name: email.split('@')[0], verified: true };
      setUser(userFromGoogle);
      localStorage.setItem('_auth_user', JSON.stringify(userFromGoogle));
    } catch (e) {
      console.error('Google sign-in demo failed', e);
    }
  };

  const sendVerification = async (email: string) => {
    if (isFirebaseEnabled) {
      return "sent";
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const payload = { email, code, createdAt: Date.now(), expiresAt: Date.now() + 1000 * 60 * 60 };
    localStorage.setItem('_auth_verif', JSON.stringify(payload));
    console.info('Verification code for', email, code);
    return code;
  };

  const verifyCode = async (email: string, code: string) => {
    if (isFirebaseEnabled) {
      const { auth: fbAuth } = getFirebaseInstances();
      if (!fbAuth?.currentUser) return false;
      return fbAuth.currentUser.emailVerified;
    }
    const raw = localStorage.getItem('_auth_verif');
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.email === email && parsed.code === code && parsed.expiresAt > Date.now()) {
        const verifiedUser = { email, verified: true };
        setUser(verifiedUser);
        localStorage.setItem('_auth_user', JSON.stringify(verifiedUser));
        localStorage.removeItem('_auth_verif');
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const logout = () => {
    (async () => {
      try {
        const { auth: fbAuth } = getFirebaseInstances();
        if (isFirebaseEnabled && fbAuth) {
          const { signOut } = await import('firebase/auth');
          await signOut(fbAuth);
        }
      } catch (e) {
        console.error('Sign out failed', e);
      }
    })();

    setUser(null);
    setOnboarding(null);
    setSessionExpiry(null);
    localStorage.removeItem("_auth_user");
    localStorage.removeItem("_session_expiry");
    // Ne pas supprimer l'onboarding du localStorage pour permettre la reconnexion
    // L'onboarding reste dans la base de données et sera rechargé lors de la reconnexion
  };

  const saveOnboarding = async (data: OnboardingData) => {
    const merged = { ...(onboarding || {}), ...data };
    setOnboarding(merged);
    localStorage.setItem("_auth_onboarding", JSON.stringify(merged));

    try {
      const { db: fbDb, auth: fbAuth } = await initializeFirebase();
      if (isFirebaseEnabled && fbDb && fbAuth && fbAuth.currentUser) {
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(fbDb, "onboardings", fbAuth.currentUser.uid), merged, { merge: true });
      }
    } catch (e) {
      console.error('Failed to persist onboarding to Firestore', e);
    }
  };

  const isAdmin = () => {
    if (!user || !user.uid) return false;
    // Vérifier uniquement depuis Firestore (pas d'emails hardcodés)
    return user.isAdmin === true;
  };

  const refreshUser = async () => {
    if (!user?.uid || !isFirebaseEnabled) return;
    
    try {
      const { db: fbDb } = await initializeFirebase();
      if (fbDb) {
        const { doc, getDoc } = await import('firebase/firestore');
        const userRef = doc(fbDb, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const updatedUser = {
            ...user,
            isAdmin: userData.isAdmin === true,
            name: userData.name || user.name,
          };
          setUser(updatedUser);
          localStorage.setItem("_auth_user", JSON.stringify(updatedUser));
        }
      }
    } catch (e) {
      console.error("Failed to refresh user data", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, onboarding, login, signup, loginWithGoogle, logout, saveOnboarding, sendVerification, verifyCode, isAdmin, refreshUser, sessionExpiry }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
