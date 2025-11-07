# Guide de Configuration Admin

Ce guide explique comment configurer et utiliser le système d'administration basé sur Firebase.

## Structure Firestore

Le système utilise la collection `users` dans Firestore pour stocker les informations des utilisateurs, incluant leur statut admin.

### Structure du document utilisateur

Chaque document dans la collection `users` a la structure suivante :

```typescript
{
  email: string;           // Email de l'utilisateur
  name: string | null;     // Nom de l'utilisateur (optionnel)
  verified: boolean;       // Statut de vérification email
  isAdmin: boolean;        // Statut admin (true/false)
  createdAt: Timestamp;    // Date de création
  updatedAt: Timestamp;     // Date de mise à jour
}
```

## Comment définir un admin dans Firebase

### Méthode 1 : Via la Console Firebase

**📖 Guide détaillé disponible** : Voir `GUIDE_CREER_ADMIN_FIREBASE.md` pour un guide étape par étape complet.

**Résumé rapide** :
1. Ouvrez la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Allez dans **Firestore Database**
4. Naviguez vers la collection `users`
5. Trouvez ou créez le document correspondant à l'utilisateur (l'ID du document est l'UID de l'utilisateur)
6. Ajoutez ou modifiez le champ `isAdmin` et définissez-le à `true` (type boolean, pas string !)

### Méthode 2 : Via l'interface Admin

1. Connectez-vous à l'application avec un compte admin existant
2. Allez dans `/admin/users`
3. Trouvez l'utilisateur que vous voulez promouvoir
4. Cliquez sur le menu (trois points) à droite
5. Sélectionnez "Promouvoir admin"

### Méthode 3 : Pour le premier admin (Création manuelle)

**📖 Guide détaillé disponible** : Voir `GUIDE_PREMIER_ADMIN.md` pour un guide étape par étape complet avec toutes les instructions détaillées.

**Résumé rapide** :
1. Connectez-vous à l'application avec votre compte
2. Notez votre UID (via Firebase Authentication ou les outils de développement)
3. Dans Firestore, créez un document dans la collection `users` avec :
   - **ID du document** : votre UID (pas votre email !)
   - **Champs** :
     - `email`: votre email (type: string)
     - `name`: votre nom (type: string, optionnel)
     - `verified`: `true` (type: boolean)
     - `isAdmin`: `true` (type: boolean) ⭐ **IMPORTANT**
     - `createdAt`: timestamp actuel (type: timestamp)
     - `updatedAt`: timestamp actuel (type: timestamp)
4. Sauvegardez et reconnectez-vous à l'application

## Création automatique des documents utilisateur

Lorsqu'un utilisateur se connecte pour la première fois, le système crée automatiquement un document dans la collection `users` avec `isAdmin: false` par défaut.

## Vérification du statut admin

Le système vérifie le statut admin uniquement depuis Firestore. Il n'y a plus d'emails hardcodés - tout est géré via la base de données.

## Sécurité

- Seuls les utilisateurs avec `isAdmin: true` peuvent accéder aux pages admin
- Les routes admin sont protégées et redirigent automatiquement les non-admins
- Le statut admin est vérifié à chaque chargement de page

## Fonctionnalités Admin

Les administrateurs ont accès à :

- **Dashboard** (`/admin`) : Vue d'ensemble avec statistiques
- **Utilisateurs** (`/admin/users`) : Gestion des utilisateurs (promouvoir/rétrograder admin, supprimer)
- **Événements** (`/admin/events`) : Gestion des événements
- **Paramètres** (`/admin/settings`) : Configuration de la plateforme

## Notes importantes

- Un utilisateur doit se reconnecter après avoir été promu admin pour que les changements prennent effet
- Le système rafraîchit automatiquement les données de l'utilisateur actuel si son statut admin change
- Les documents utilisateur sont créés automatiquement lors de la première connexion

