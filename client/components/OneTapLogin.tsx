import { useEffect, useState, useCallback } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithCredential, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Configuration Firebase - ces valeurs viennent de votre projet Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ID client Google OAuth - créez-le dans Google Cloud Console
// Ce n'est PAS le même que Firebase API Key!
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export default function OneTapLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialiser Firebase
  const getAuthInstance = useCallback(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    return getAuth();
  }, []);

  // Charger les données utilisateur depuis Firestore
  const loadUserData = async (firebaseUser: FirebaseUser): Promise<User> => {
    const db = getFirestore();
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    let isAdmin = false;
    if (userSnap.exists()) {
      const userData = userSnap.data();
      isAdmin = userData.isAdmin === true;
    } else {
      // Créer le document utilisateur s'il n'existe pas
      await setDoc(userRef, {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        verified: firebaseUser.emailVerified,
        isAdmin: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };
  };

  // Gérer la réponse Google One Tap
  const handleCredentialResponse = useCallback(async (response: { credential: string }) => {
    setLoading(true);
    setError(null);

    try {
      const auth = getAuthInstance();
      
      // Créer le credential depuis le token Google
      // NOTE: En production, validez le token sur votre serveur pour plus de sécurité
      const { GoogleAuthProvider } = await import('firebase/auth');
      const credential = GoogleAuthProvider.credential(response.credential);
      
      // Connecter avec Firebase
      const result = await signInWithCredential(auth, credential);
      
      // Charger les données utilisateur
      const userData = await loadUserData(result.user);
      setUser(userData);
      
      console.log('Utilisateur connecté:', userData.email);
    } catch (err: any) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  }, [getAuthInstance]);

  // Initialiser Google One Tap
  useEffect(() => {
    // Charger le script Google Identity Services
    const loadGoogleScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.google) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google script'));
        document.head.appendChild(script);
      });
    };

    const initializeOneTap = async () => {
      try {
        await loadGoogleScript();
        
        const auth = getAuthInstance();
        
        // Écouter les changements d'état d'authentification
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const userData = await loadUserData(firebaseUser);
            setUser(userData);
          } else {
            // Initialiser Google One Tap seulement si pas d'utilisateur connecté
            if (window.google && GOOGLE_CLIENT_ID) {
              window.google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: 'profile email openid',
                callback: (response: any) => {
                  if (response.credential) {
                    handleCredentialResponse({ credential: response.credential });
                  }
                },
              });
              
              // Afficher One Tap automatiquement
              window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
                auto_select: true, // Auto-sélectionne le dernier compte utilisé
                cancel_on_tap_outside: false,
              });
              
              window.google.accounts.id.prompt();
            }
          }
          setLoading(false);
        });
      } catch (err) {
        console.error('Erreur initialisation One Tap:', err);
        setLoading(false);
      }
    };

    initializeOneTap();
  }, [getAuthInstance, handleCredentialResponse]);

  // Déconnexion
  const handleSignOut = async () => {
    try {
      const auth = getAuthInstance();
      await firebaseSignOut(auth);
      setUser(null);
      
      // Recharger la page ou réinitialiser One Tap
      if (window.google && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (err: any) {
      console.error('Erreur de déconnexion:', err);
      setError(err.message || 'Erreur lors de la déconnexion');
    }
  };

  // Afficher les erreurs
  if (error) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fee', borderRadius: '8px' }}>
        <p style={{ color: '#c00' }}>{error}</p>
        <button onClick={() => setError(null)}>Réessayer</button>
      </div>
    );
  }

  // Afficher l'utilisateur connecté
  if (user) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0fff4', 
        borderRadius: '8px',
        border: '1px solid #48bb78'
      }}>
        <h3 style={{ marginBottom: '10px' }}>Bienvenue!</h3>
        {user.photoURL && (
          <img 
            src={user.photoURL} 
            alt={user.displayName || 'Avatar'}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
        )}
        <p><strong>Nom:</strong> {user.displayName || 'Non défini'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
        <button 
          onClick={handleSignOut}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  // Afficher le chargement ou le bouton de connexion
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>Veuillez vous connecter avec Google</p>
      {/* Google One Tap devrait s'afficher automatiquement */}
    </div>
  );
}

// Déclarer le type pour Google Identity Services
declare global {
  interface Window {
    google: any;
  }
}
