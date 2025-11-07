# Configuration Firebase

Ce document explique comment configurer Firebase pour ce projet.

## Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Configuration Firebase
# Clé API Firebase (obligatoire)
VITE_FIREBASE_API_KEY=your_api_key_here

# Domaine d'authentification Firebase (obligatoire)
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com

# ID du projet Firebase (obligatoire)
VITE_FIREBASE_PROJECT_ID=your-project-id

# Bucket de stockage Firebase (optionnel, pour Firebase Storage)
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

# ID de l'expéditeur de messages Firebase (optionnel)
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

# ID de l'application Firebase (optionnel)
VITE_FIREBASE_APP_ID=your_app_id

# ID de mesure Analytics (optionnel, pour Google Analytics)
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Étapes de configuration

1. **Créer un projet Firebase**
   - Allez sur [Firebase Console](https://console.firebase.google.com/)
   - Cliquez sur "Ajouter un projet"
   - Suivez les instructions pour créer votre projet

2. **Ajouter une application Web**
   - Dans votre projet Firebase, cliquez sur l'icône Web (`</>`)
   - Enregistrez votre application avec un nom
   - Copiez la configuration Firebase qui s'affiche

3. **Configurer l'authentification**
   - Dans Firebase Console, allez dans "Authentication" > "Sign-in method"
   - Activez "Email/Password" et "Google" selon vos besoins

4. **Configurer Firestore**
   - Dans Firebase Console, allez dans "Firestore Database"
   - Créez une base de données en mode "Production" ou "Test"
   - Configurez les règles de sécurité (voir ci-dessous)

5. **Configurer Storage (optionnel)**
   - Dans Firebase Console, allez dans "Storage"
   - Cliquez sur "Commencer" pour activer Firebase Storage
   - Configurez les règles de sécurité

## Règles de sécurité Firestore

Exemple de règles de sécurité pour Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Onboarding: chaque utilisateur ne peut lire/écrire que son propre document
    match /onboardings/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Événements: lecture publique pour les utilisateurs authentifiés, écriture restreinte
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow write: if false; // À modifier selon vos besoins (ex: admin uniquement)
    }
  }
}
```

## Règles de sécurité Storage (si utilisé)

Exemple de règles de sécurité pour Firebase Storage :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Les utilisateurs authentifiés peuvent lire/écrire leurs propres fichiers
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Les fichiers publics peuvent être lus par tous
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Seulement les utilisateurs authentifiés peuvent écrire
    }
  }
}
```

## Migration des données existantes

Pour migrer les événements locaux vers Firestore, vous pouvez utiliser la fonction `migrateEventsToFirestore()` depuis la console du navigateur :

```javascript
import { migrateEventsToFirestore } from '@/lib/events';
await migrateEventsToFirestore();
```

Ou créez une page utilitaire dans votre application pour effectuer la migration.

## Vérification de la configuration

Une fois configuré, redémarrez le serveur de développement :

```bash
pnpm dev
```

L'application utilisera automatiquement Firebase si les variables d'environnement sont correctement configurées. Si Firebase n'est pas disponible, l'application utilisera les données locales en fallback.

## Dépannage

- **Firebase ne s'initialise pas** : Vérifiez que toutes les variables d'environnement obligatoires sont définies
- **Erreurs d'authentification** : Vérifiez que les méthodes de connexion sont activées dans Firebase Console
- **Erreurs Firestore** : Vérifiez les règles de sécurité et que Firestore est activé
- **Erreurs Storage** : Vérifiez que Storage est activé et que les règles sont correctes

