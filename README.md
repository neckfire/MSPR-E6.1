# MSPR
Application mobile A-Rosa'Je

# API Authentication Documentation

## Base URL
```
http://localhost:3010
```

## Endpoints d'Authentification

### 1. Inscription (Register)
**Endpoint:** `POST /auth/registration/`

**Body:**
```json
{
    "username": "string",
    "email": "user@example.com",
    "password1": "string",
    "password2": "string"
}
```

**Réponse Succès (201):**
```json
{
    "key": "string" // Token d'authentification
}
```

### 2. Connexion (Login)
**Endpoint:** `POST /auth/login/`

**Body:**
```json
{
    "username": "string",
    "password": "string"
}
```

**Réponse Succès (200):**
```json
{
    "key": "string" // Token d'authentification
}
```

### 3. Déconnexion (Logout)
**Endpoint:** `POST /auth/logout/`

**Headers:**
```
Authorization: Token <your-token>
```

**Réponse Succès (200):**
```json
{
    "detail": "Successfully logged out."
}
```

### 4. Informations Utilisateur
**Endpoint:** `GET /auth/user/`

**Headers:**
```
Authorization: Token <your-token>
```

**Réponse Succès (200):**
```json
{
    "pk": integer,
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string"
}
```

### 5. Modification du Profil Utilisateur
**Endpoint:** `PUT /auth/user/`

**Headers:**
```
Authorization: Token <your-token>
```

**Body:**
```json
{
    "username": "string",
    "email": "user@example.com",
    "first_name": "string",
    "last_name": "string"
}
```

### 6. Réinitialisation du Mot de Passe
**Endpoint:** `POST /auth/password/reset/`

**Body:**
```json
{
    "email": "user@example.com"
}
```

### 7. Changement de Mot de Passe (Utilisateur connecté)
**Endpoint:** `POST /auth/password/change/`

**Headers:**
```
Authorization: Token <your-token>
```

**Body:**
```json
{
    "old_password": "string",
    "new_password1": "string",
    "new_password2": "string"
}
```

## Utilisation des Tokens

Pour toutes les requêtes nécessitant une authentification, incluez le token dans le header :
```
Authorization: Token <your-token>
```

## Codes d'Erreur Communs

- `400 Bad Request`: Données invalides
- `401 Unauthorized`: Token manquant ou invalide
- `403 Forbidden`: Permissions insuffisantes
- `404 Not Found`: Ressource non trouvée

## Exemples de Requêtes avec cURL

### Inscription
```bash
curl -X POST http://localhost:3010/auth/registration/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password1": "complexpassword123",
    "password2": "complexpassword123"
  }'
```

### Connexion
```bash
curl -X POST http://localhost:3010/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "complexpassword123"
  }'
```

### Récupérer les Informations Utilisateur
```bash
curl -X GET http://localhost:3010/auth/user/ \
  -H "Authorization: Token <your-token>"
```