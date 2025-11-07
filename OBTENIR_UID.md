# Comment Obtenir l'UID d'un Utilisateur

Si `JSON.parse(localStorage.getItem('_auth_user'))?.uid` donne `undefined`, voici plusieurs méthodes alternatives pour obtenir l'UID.

## 🔍 Méthode 1 : Via Firebase Authentication (Recommandé)

C'est la méthode la plus simple et fiable :

1. **Ouvrez la Console Firebase** : [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Sélectionnez votre projet**
3. **Cliquez sur "Authentication"** dans le menu de gauche
4. **Cliquez sur l'onglet "Users"**
5. **Trouvez l'utilisateur** dans la liste (recherchez par email)
6. **Copiez l'UID** qui est affiché dans la colonne "User UID"
   - C'est une chaîne de caractères longue (ex: `abc123def456ghi789jkl012mno345pqr678`)

## 🔍 Méthode 2 : Via les Outils de Développement (Application)

1. **Connectez-vous à l'application** avec le compte concerné
2. **Ouvrez les outils de développement** (F12 ou Ctrl+Shift+I / Cmd+Option+I)
3. **Allez dans l'onglet "Application"** (Chrome) ou "Stockage" (Firefox)
4. **Dans le menu de gauche**, développez "Local Storage"
5. **Cliquez sur l'URL de votre site** (ex: `http://localhost:8080`)
6. **Cherchez la clé `_auth_user`** dans la liste
7. **Cliquez dessus** pour voir sa valeur
8. **Dans la valeur JSON**, cherchez le champ `uid` et copiez-le

## 🔍 Méthode 3 : Via la Console du Navigateur (Alternative)

1. **Connectez-vous à l'application** avec le compte concerné
2. **Ouvrez les outils de développement** (F12)
3. **Allez dans l'onglet "Console"**
4. **Tapez cette commande** :
   ```javascript
   localStorage.getItem('_auth_user')
   ```
5. **Copiez le résultat** (c'est une chaîne JSON)
6. **Collez-le dans un éditeur de texte** et cherchez `"uid":` suivi d'une chaîne entre guillemets
7. **Copiez la valeur de `uid`** (sans les guillemets)

## 🔍 Méthode 4 : Via Firebase Auth dans la Console

Si vous avez accès à Firebase dans la console du navigateur :

1. **Ouvrez les outils de développement** (F12)
2. **Allez dans l'onglet "Console"**
3. **Tapez cette commande** (si Firebase est chargé) :
   ```javascript
   firebase.auth().currentUser?.uid
   ```
   Ou pour les versions récentes :
   ```javascript
   window.firebase?.auth()?.currentUser?.uid
   ```

## 🔍 Méthode 5 : Si vous avez seulement l'ID (email)

Si vous avez seulement l'email de l'utilisateur :

1. **Ouvrez la Console Firebase**
2. **Allez dans Authentication → Users**
3. **Utilisez la barre de recherche** pour trouver l'utilisateur par email
4. **Cliquez sur l'utilisateur** pour voir ses détails
5. **L'UID est affiché** en haut du panneau de détails

## ✅ Une fois que vous avez l'UID

Une fois que vous avez l'UID, suivez ces étapes :

1. **Allez dans Firestore Database** dans la Console Firebase
2. **Ouvrez la collection `users`**
3. **Cherchez le document** avec l'ID = votre UID
   - Si le document n'existe pas, créez-le avec l'UID comme ID du document
4. **Ajoutez ou modifiez le champ `isAdmin`** :
   - Type : `boolean`
   - Valeur : `true`
5. **Sauvegardez**

## 🎯 Méthode la Plus Simple

**La méthode la plus simple est via Firebase Authentication** :

1. Console Firebase → Authentication → Users
2. Trouvez l'utilisateur par email
3. Copiez l'UID affiché
4. Utilisez cet UID comme ID du document dans Firestore

## ⚠️ Note Importante

Si le document n'existe pas encore dans la collection `users` :
- L'utilisateur doit se connecter au moins une fois à l'application
- Le système crée automatiquement le document lors de la première connexion
- Vous pouvez aussi créer le document manuellement avec l'UID comme ID

