# Guide Détaillé : Créer un Admin via la Console Firebase

Ce guide vous explique étape par étape comment créer un administrateur directement dans la Console Firebase.

## 📋 Prérequis

1. Avoir un compte Firebase configuré
2. Avoir accès à la Console Firebase de votre projet
3. Avoir l'UID de l'utilisateur que vous voulez promouvoir admin

## 🔍 Étape 1 : Obtenir l'UID de l'utilisateur

### ⭐ Option A : Via Firebase Authentication (RECOMMANDÉ - Le plus simple)

**C'est la méthode la plus fiable et la plus simple** :

1. Ouvrez la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Allez dans **Authentication** (dans le menu de gauche)
4. Cliquez sur l'onglet **Users**
5. **Trouvez l'utilisateur** dans la liste (vous pouvez rechercher par email)
6. **Copiez l'UID** qui est affiché dans la colonne "User UID"
   - C'est une chaîne de caractères longue (ex: `abc123def456ghi789jkl012mno345pqr678`)
   - L'UID est unique pour chaque utilisateur

### Option B : Via les Outils de Développement (Application)

Si la méthode A ne fonctionne pas :

1. **Connectez-vous à l'application** avec le compte que vous voulez promouvoir admin
2. **Ouvrez les outils de développement** du navigateur :
   - Chrome/Edge : `F12` ou `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Firefox : `F12` ou `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. **Allez dans l'onglet "Application"** (Chrome) ou "Stockage" (Firefox)
4. **Dans le menu de gauche**, développez "Local Storage"
5. **Cliquez sur l'URL de votre site**
6. **Cherchez la clé `_auth_user`** et cliquez dessus
7. **Dans la valeur JSON affichée**, cherchez `"uid":` et copiez la valeur (sans les guillemets)

### Option C : Via la Console du Navigateur

1. **Connectez-vous à l'application** avec le compte concerné
2. **Ouvrez les outils de développement** (F12)
3. **Allez dans l'onglet "Console"**
4. **Tapez cette commande** :
   ```javascript
   localStorage.getItem('_auth_user')
   ```
5. **Copiez le résultat** (chaîne JSON)
6. **Collez-le dans un éditeur de texte** et cherchez `"uid":` suivi d'une chaîne entre guillemets
7. **Copiez la valeur de `uid`** (sans les guillemets)

**💡 Astuce** : Si vous avez seulement l'email, utilisez l'Option A et recherchez l'utilisateur par email dans Firebase Authentication.

## 🚀 Étape 2 : Accéder à Firestore Database

1. **Ouvrez la Console Firebase** : [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Sélectionnez votre projet** dans la liste déroulante en haut
3. Dans le menu de gauche, cliquez sur **Firestore Database**
   - Si c'est la première fois, vous devrez peut-être créer la base de données
   - Choisissez le mode de production ou de test (vous pouvez changer plus tard)

## 📁 Étape 3 : Naviguer vers la collection "users"

1. Dans la page Firestore Database, vous verrez une liste de collections
2. **Cherchez la collection nommée `users`**
   - Si elle n'existe pas encore, vous devrez la créer (voir étape 4)
   - Si elle existe, cliquez dessus pour l'ouvrir

## ➕ Étape 4 : Créer ou modifier le document utilisateur

### Si le document n'existe pas encore :

1. **Cliquez sur "Add document"** (Ajouter un document)
2. **Dans le champ "Document ID"**, entrez l'**UID de l'utilisateur** que vous avez copié à l'étape 1
3. **Cliquez sur "Next"** (Suivant)

### Si le document existe déjà :

1. **Trouvez le document** avec l'UID de l'utilisateur dans la liste
2. **Cliquez sur le document** pour l'ouvrir

## ✏️ Étape 5 : Ajouter ou modifier le champ isAdmin

### Si vous créez un nouveau document :

1. **Ajoutez les champs suivants** :
   - **Champ 1** :
     - Nom du champ : `email`
     - Type : `string`
     - Valeur : l'email de l'utilisateur (ex: `user@example.com`)
   - **Champ 2** :
     - Nom du champ : `name`
     - Type : `string` (ou `null` si pas de nom)
     - Valeur : le nom de l'utilisateur (ex: `John Doe`) ou laissez vide
   - **Champ 3** :
     - Nom du champ : `verified`
     - Type : `boolean`
     - Valeur : `true` (cochez la case)
   - **Champ 4** :
     - Nom du champ : `isAdmin`
     - Type : `boolean`
     - Valeur : `true` (cochez la case) ⭐ **C'EST LE CHAMP IMPORTANT**
   - **Champ 5** :
     - Nom du champ : `createdAt`
     - Type : `timestamp`
     - Valeur : Cliquez sur "Set to current time" (Définir à l'heure actuelle)
   - **Champ 6** :
     - Nom du champ : `updatedAt`
     - Type : `timestamp`
     - Valeur : Cliquez sur "Set to current time" (Définir à l'heure actuelle)

2. **Cliquez sur "Save"** (Enregistrer)

### Si le document existe déjà :

1. **Trouvez le champ `isAdmin`** dans le document
   - S'il n'existe pas, cliquez sur "Add field" (Ajouter un champ)
   - S'il existe, cliquez dessus pour le modifier
2. **Définissez la valeur à `true`** :
   - Type : `boolean`
   - Valeur : `true` (cochez la case)
3. **Mettez à jour le champ `updatedAt`** :
   - Cliquez sur le champ `updatedAt`
   - Cliquez sur "Set to current time" (Définir à l'heure actuelle)
4. **Cliquez sur "Update"** (Mettre à jour)

## ✅ Étape 6 : Vérifier que ça fonctionne

1. **Déconnectez-vous** de l'application (si vous êtes connecté)
2. **Reconnectez-vous** avec le compte que vous venez de promouvoir admin
3. **Vérifiez** :
   - Vous devriez voir un lien "Admin" dans le header
   - Vous devriez pouvoir accéder à `/admin`
   - Le dashboard admin devrait s'afficher

## 🎯 Exemple de document utilisateur complet

Voici à quoi devrait ressembler un document utilisateur dans Firestore :

```
Collection: users
Document ID: abc123def456ghi789

Champs:
├── email: "admin@example.com" (string)
├── name: "Admin User" (string)
├── verified: true (boolean)
├── isAdmin: true (boolean) ⭐
├── createdAt: 2024-01-15 10:30:00 (timestamp)
└── updatedAt: 2024-01-15 10:30:00 (timestamp)
```

## 🔧 Dépannage

### Le document n'apparaît pas dans la collection users

- **Solution** : L'utilisateur doit se connecter au moins une fois à l'application. Le système crée automatiquement le document lors de la première connexion.

### Je ne vois pas le lien "Admin" après avoir défini isAdmin

- **Solution 1** : Déconnectez-vous et reconnectez-vous
- **Solution 2** : Vérifiez que le champ `isAdmin` est bien de type `boolean` et non `string`
- **Solution 3** : Vérifiez que la valeur est bien `true` et non `"true"` (avec guillemets)

### Erreur "Permission denied" dans Firestore

- **Solution** : Vérifiez les règles de sécurité Firestore. Assurez-vous que les utilisateurs authentifiés peuvent lire/écrire dans la collection `users`.

### Je ne trouve pas l'UID de l'utilisateur

- **Solution** : Utilisez la méthode Option B (via Firebase Authentication) décrite à l'étape 1

## 📝 Notes importantes

- ⚠️ **Important** : Le champ `isAdmin` doit être de type `boolean`, pas `string`
- ⚠️ **Important** : L'utilisateur doit se reconnecter pour que les changements prennent effet
- ✅ Le système crée automatiquement les documents utilisateur lors de la première connexion
- ✅ Vous pouvez promouvoir/rétrograder des admins via l'interface admin (`/admin/users`)

## 🎉 C'est fait !

Une fois ces étapes terminées, l'utilisateur sera administrateur et pourra accéder à toutes les fonctionnalités admin de l'application.

