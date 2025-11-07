export let isFirebaseEnabled = Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);

let _auth: any = null;
let _db: any = null;
let _storage: any = null;
let _googleProvider: any = null;
let _initialized = false;
let _initError: Error | null = null;

export async function initializeFirebase() {
  if (!isFirebaseEnabled) {
    return { auth: null, db: null, storage: null, googleProvider: null, error: null };
  }
  if (_initialized) {
    return { auth: _auth, db: _db, storage: _storage, googleProvider: _googleProvider, error: _initError };
  }
  if (_initError) {
    return { auth: null, db: null, storage: null, googleProvider: null, error: _initError };
  }

  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getAuth, GoogleAuthProvider } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');
    const { getStorage } = await import('firebase/storage');

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? undefined,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? undefined,
    };

    // Validation des champs obligatoires
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error('VITE_FIREBASE_API_KEY et VITE_FIREBASE_PROJECT_ID sont requis');
    }

    if (!getApps().length) {
      initializeApp(firebaseConfig as any);
    }

    _auth = getAuth();
    _db = getFirestore();
    
    // Initialiser Storage seulement si storageBucket est configuré
    if (firebaseConfig.storageBucket) {
      try {
        _storage = getStorage();
      } catch (storageError) {
        console.warn('Firebase Storage non disponible:', storageError);
        _storage = null;
      }
    } else {
      _storage = null;
    }
    
    _googleProvider = new GoogleAuthProvider();
    _googleProvider.setCustomParameters({
      prompt: 'select_account',
    });
    
    _initialized = true;
    _initError = null;

    return { auth: _auth, db: _db, storage: _storage, googleProvider: _googleProvider, error: null };
  } catch (e) {
    const error = e instanceof Error ? e : new Error('Erreur inconnue lors de l\'initialisation Firebase');
    console.error('Échec du chargement de Firebase:', error);
    _initError = error;
    isFirebaseEnabled = false;
    return { auth: null, db: null, storage: null, googleProvider: null, error };
  }
}

export function getFirebaseInstances() {
  return { auth: _auth, db: _db, storage: _storage, googleProvider: _googleProvider };
}

/**
 * Réinitialise Firebase (utile pour les tests ou le rechargement)
 */
export function resetFirebase() {
  _auth = null;
  _db = null;
  _storage = null;
  _googleProvider = null;
  _initialized = false;
  _initError = null;
}