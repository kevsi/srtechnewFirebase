# Guide : Créer le Premier Admin (Méthode 3)

Ce guide vous explique comment créer le premier administrateur en créant manuellement le document dans Firestore.

## 📋 Prérequis

1. ✅ Vous avez déjà votre UID (vous l'avez trouvé)
2. ✅ Vous avez accès à la Console Firebase
3. ✅ Vous êtes connecté à l'application avec votre compte

## 🎯 Étape 1 : Vérifier votre UID

Avant de continuer, assurez-vous d'avoir votre UID. C'est une chaîne de caractères longue qui ressemble à :
```
abc123def456ghi789jkl012mno345pqr678
```

**Si vous n'avez pas encore votre UID**, voici comment l'obtenir :

### Option A : Via Firebase Authentication (Le plus simple)

1. Ouvrez la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Allez dans **Authentication** → **Users**
4. Trouvez votre utilisateur (par email)
5. **Copiez l'UID** affiché dans la colonne "User UID"

### Option B : Via les Outils de Développement

1. Connectez-vous à l'application avec votre compte
2. Ouvrez les outils de développement (F12)
3. Allez dans l'onglet **Application** (Chrome) ou **Stockage** (Firefox)
4. Développez **Local Storage** → cliquez sur l'URL de votre site
5. Cherchez la clé `_auth_user` et cliquez dessus
6. Dans la valeur JSON, cherchez `"uid":` et copiez la valeur

## 🚀 Étape 2 : Accéder à Firestore Database

1. **Ouvrez la Console Firebase** : [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Sélectionnez votre projet** dans la liste déroulante en haut
3. Dans le menu de gauche, cliquez sur **Firestore Database**
   - Si c'est la première fois, vous devrez peut-être créer la base de données
   - Choisissez le mode de production ou de test (vous pouvez changer plus tard)

## 📁 Étape 3 : Créer ou ouvrir la collection "users"

1. Dans la page Firestore Database, regardez la liste des collections
2. **Si la collection `users` existe déjà** :
   - Cliquez dessus pour l'ouvrir
   - Passez à l'étape 4
3. **Si la collection `users` n'existe pas** :
   - Cliquez sur **"Add collection"** (Ajouter une collection)
   - Dans le champ "Collection ID", tapez : `users`
   - Cliquez sur **"Next"** (Suivant)
   - Vous allez maintenant créer le premier document

## ➕ Étape 4 : Créer le document utilisateur

### 4.1 : Cliquer sur "Add document"

1. Si vous venez de créer la collection, vous êtes déjà sur la page de création
2. Si la collection existe déjà, cliquez sur **"Add document"** (Ajouter un document) en haut à gauche

### 4.2 : Définir l'ID du document

1. **Dans le champ "Document ID"**, entrez votre **UID** que vous avez copié à l'étape 1
   - ⚠️ **Important** : Utilisez exactement votre UID, sans espaces, sans guillemets
   - Exemple : `abc123def456ghi789jkl012mno345pqr678`
2. **Cliquez sur "Next"** (Suivant) ou "Set ID" selon l'interface

### 4.3 : Ajouter les champs

Vous allez maintenant ajouter les champs un par un. Pour chaque champ :

1. Cliquez sur **"Add field"** (Ajouter un champ)
2. Entrez le nom du champ
3. Sélectionnez le type
4. Entrez la valeur
5. Cliquez sur **"Done"** ou appuyez sur Entrée

**Ajoutez les champs suivants dans l'ordre** :

#### Champ 1 : `email`
- **Nom du champ** : `email`
- **Type** : `string`
- **Valeur** : Votre adresse email (ex: `admin@example.com`)
- Cliquez sur **Done**

#### Champ 2 : `name`
- **Nom du champ** : `name`
- **Type** : `string` (ou `null` si vous n'avez pas de nom)
- **Valeur** : Votre nom (ex: `John Doe`) ou laissez vide si vous choisissez `null`
- Cliquez sur **Done**

#### Champ 3 : `verified`
- **Nom du champ** : `verified`
- **Type** : `boolean`
- **Valeur** : `true` (cochez la case ou sélectionnez `true`)
- Cliquez sur **Done**

#### Champ 4 : `isAdmin` ⭐ **LE PLUS IMPORTANT**
- **Nom du champ** : `isAdmin`
- **Type** : `boolean` (⚠️ **IMPORTANT** : pas `string`, pas `number`, mais bien `boolean`)
- **Valeur** : `true` (cochez la case ou sélectionnez `true`)
- Cliquez sur **Done**

#### Champ 5 : `createdAt`
- **Nom du champ** : `createdAt`
- **Type** : `timestamp`
- **Valeur** : Cliquez sur **"Set to current time"** (Définir à l'heure actuelle) ou entrez la date/heure actuelle
- Cliquez sur **Done**

#### Champ 6 : `updatedAt`
- **Nom du champ** : `updatedAt`
- **Type** : `timestamp`
- **Valeur** : Cliquez sur **"Set to current time"** (Définir à l'heure actuelle) ou entrez la date/heure actuelle
- Cliquez sur **Done**

### 4.4 : Vérifier avant de sauvegarder

Avant de sauvegarder, vérifiez que vous avez bien :

✅ **6 champs** au total :
- `email` (string)
- `name` (string ou null)
- `verified` (boolean = true)
- `isAdmin` (boolean = true) ⭐
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

✅ **L'ID du document** est bien votre UID

✅ **Le champ `isAdmin`** est bien de type `boolean` et a la valeur `true`

### 4.5 : Sauvegarder

1. **Cliquez sur "Save"** (Enregistrer) en bas à droite
2. Le document devrait maintenant apparaître dans la collection `users`

## ✅ Étape 5 : Vérifier que ça fonctionne

1. **Retournez à l'application** (si vous êtes toujours connecté, déconnectez-vous d'abord)
2. **Déconnectez-vous** de l'application (si vous êtes connecté)
3. **Reconnectez-vous** avec votre compte
4. **Vérifiez** :
   - Vous devriez voir un lien **"Admin"** dans le header (en haut à droite)
   - Si vous cliquez dessus, vous devriez accéder au dashboard admin
   - L'URL devrait être `/admin`

## 🎯 Résumé des étapes clés

1. ✅ Obtenir votre UID
2. ✅ Aller dans Firestore Database
3. ✅ Créer/ouvrir la collection `users`
4. ✅ Créer un document avec votre UID comme ID
5. ✅ Ajouter les 6 champs (surtout `isAdmin: true`)
6. ✅ Sauvegarder
7. ✅ Se reconnecter à l'application

## ⚠️ Points importants à retenir

- ⚠️ **L'ID du document** doit être exactement votre UID (pas votre email)
- ⚠️ **Le champ `isAdmin`** doit être de type `boolean`, pas `string`
- ⚠️ **La valeur de `isAdmin`** doit être `true` (pas `"true"` avec guillemets)
- ✅ Vous devez vous **reconnecter** pour que les changements prennent effet

## 🔧 Dépannage

### Le document n'apparaît pas après sauvegarde

- **Solution** : Rafraîchissez la page Firestore
- Vérifiez que vous avez bien cliqué sur "Save"

### Je ne vois pas le lien "Admin" après reconnexion

- **Solution 1** : Vérifiez que `isAdmin` est bien de type `boolean` et non `string`
- **Solution 2** : Vérifiez que la valeur est bien `true` et non `"true"` (avec guillemets)
- **Solution 3** : Videz le cache du navigateur et reconnectez-vous
- **Solution 4** : Vérifiez dans Firestore que le document existe bien avec votre UID

### Erreur "Permission denied" lors de la sauvegarde

- **Solution** : Vérifiez les règles de sécurité Firestore. Assurez-vous d'avoir les permissions d'écriture.

### Je ne trouve pas la collection "users"

- **Solution** : Créez-la en cliquant sur "Add collection" et en tapant `users`

## 📝 Exemple de document final

Votre document dans Firestore devrait ressembler à ceci :

```
Collection: users
Document ID: [VOTRE_UID_ICI]

Champs:
├── email: "admin@example.com" (string)
├── name: "Admin User" (string)
├── verified: true (boolean)
├── isAdmin: true (boolean) ⭐
├── createdAt: 2024-01-15 10:30:00 (timestamp)
└── updatedAt: 2024-01-15 10:30:00 (timestamp)
```

## 🎉 C'est fait !

Une fois ces étapes terminées, vous serez administrateur et pourrez accéder à toutes les fonctionnalités admin de l'application via `/admin`.

