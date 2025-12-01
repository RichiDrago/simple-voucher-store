# API reference

Questa documentazione elenca gli endpoint principali del backend, con esempi di richieste e risposte.
Tutte le API (eccetto quelle pubbliche) richiedono un token JWT inviato tramite header:

```
Authorization: Bearer <token>
```

# Indice API

- [Auth](#auth)
  - [POST /auth/login](#post-authlogin)
  - [POST /auth/register](#post-authregister)
- [Users](#users)
  - [GET /users](#get-users)
  - [GET /usersid](#get-usersid)
  - [PUT /usersid](#put-usersid)
  - [DELETE /usersid](#delete-usersid)
- [Vouchers](#vouchers)
  - [GET /vouchers](#get-vouchers)
  - [GET /vouchersid](#get-vouchersid)
  - [PUT /vouchersid](#put-vouchersid)
  - [DELETE /vouchersid](#delete-vouchersid)
- [Voucher Purchase](#voucher-purchase)
  - [GET /voucher-purchase](#get-voucher-purchase)
  - [GET /voucher-purchaseid](#get-voucher-purchaseid)
  - [PUT /voucher-purchaseid](#put-voucher-purchaseid)
  - [DELETE /voucher-purchaseid](#delete-voucher-purchaseid)
  - [POST /voucher-purchase](#post-voucher-purchase)

---

## Auth

### POST /auth/login

### Richiesta

#### Headers

```
{}
```

#### Body

```
{
  "username": "string",
  "password": "string"
}
```

### Risposta

#### Status code HTTP
200

#### Body

```
{
  "success": true,
  "result": {
    "message": "User logged in successfully"
  },
  "data": {
    "jwtToken": string // token JWT
  }
}
```

### Errore nella richiesta

| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_CREDENTIALS        | "Invalid username or password"     |
| **500**   | JWT_CONFIG_ERROR        | "JWT secrets are not configured"     |

---

### POST /auth/register

### Richiesta

#### Headers

```
{}
```

#### Body

```
{
  "username": "string",
  "password": "string"
}
```

### Risposta

#### Status code HTTP
200

#### Body

```
{
  "success": true,
  "result": {
    "message": "User logged in successfully"
  },
  "data": {
    "jwtToken": string // token JWT
  }
}
```

### Errore nella richiesta

| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **500**   | JWT_CONFIG_ERROR        | "JWT secrets are not configured"    |


---

## Users

### GET /users

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Users fetched successfully"
  },
  "data": [
    {
      "id": number,
      "username": string,
      "privilege_name": string,
      "privilege_level": number
    },
    ...
  ]
}
```

### Errore nella richiesta

| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |

---

### GET /users/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter

| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id utente | numerico      |

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Users fetched successfully"
  },
  "data": {
      "id": number,
      "username": string,
      "privilege_name": string,
      "privilege_level": number
    }
}
```

### Errore nella richiesta

| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | USER_NOT_FOUND        | "User not found"     |

---

### PUT /users/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter

| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id utente | numerico      |

#### Body
```
{ 
      "username": string,
      "privilege_name": string,
      "password": string
}
```

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "User edited successfully"
  },
  "data": {
      "id": number,
      "username": string,
      "privilege_name": string,
      "privilege_level": number
    }
}
```

### Errore nella richiesta

| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | VOUCHER_NOT_FOUND        | "User not found"     |

---

### DELETE /users/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter

| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id utente | numerico      |

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "User deleted successfully"
  },
  "data": null
}
```

### Errore nella richiesta

| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | USER_NOT_FOUND        | "User not found"     |

---

## Vouchers

### GET /vouchers

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Vouchers fetched successfully"
  },
  "data": [
    {
      "id": 1,
      "name": string,
      "description": string,
      "assets": string[],
      "price_options": number[]
    },
    ...
  ]
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |

---

### GET /vouchers/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter
| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id voucher | numerico      |

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher fetched successfully"
  },
  "data": {
      "id": 1,
      "name": string,
      "description": string,
      "assets": string[],
      "price_options": number[]
    }
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | USER_NOT_FOUND        | "Voucher not found"     |

---

### PUT /vouchers/:id

### Richiesta

#### Headers
```
{
  Authorization: Bearer <token>
}
```

#### Body
```
{
    "name": string | undefined,
    "description": string | undefined,
}
```

#### Route Parameter
| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id voucher | numerico      |


### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher edited successfully"
  },
  "data": {
      "id": 1,
      "name": string,
      "description": string,
      "assets": string[],
      "price_options": number[]
    }
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | USER_NOT_FOUND        | "Voucher not found"     |

---

### DELETE /vouchers/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter
| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id voucher | numerico      |

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher deleted successfully"
  },
  "data": null
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | USER_NOT_FOUND        | "Voucher not found"     |

---

## Voucher Purchase

### GET /voucher-purchase

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher purchases fetched successfully"
  },
  "data": [
    {
      "id": number,
      "user_id": number,
      "voucher_id": number,
      "price_option": string,
      "date": string,
      "quantity": number
    },
    ...
  ]
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |

---

### GET /voucher-purchase/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter
| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id voucher purchase | numerico      |

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher purchases fetched successfully"
  },
  "data": {
      "id": number,
      "user_id": number,
      "voucher_id": number,
      "price_option": string,
      "date": string,
      "quantity": number
    }
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | VOUCHER_PURCHASE_NOT_FOUND        | "Voucher purchase not found"     |

---

### PUT /voucher-purchase/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter
| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id voucher purchase | numerico      |

#### Body
```
{
    "user_id": number | undefined,
    "voucher_id": number | undefined,
    "price_option": string | undefined,
    "date": string | undefined,
    "quantity": number | undefined,
}
```

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher purchases fetched successfully"
  },
  "data": {
      "id": number,
      "user_id": number,
      "voucher_id": number,
      "price_option": string,
      "date": string,
      "quantity": number
    }
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | VOUCHER_PURCHASE_NOT_FOUND        | "Voucher purchase not found"     |

---

### DELETE /voucher-purchase/:id

### Richiesta

#### Headers

```
{
  Authorization: Bearer <token>
}
```

#### Route Parameter
| Parametro | Descrizione | Tipo      |
|-----------|-------------|-----------|
| **id**   | Id voucher purchase | numerico      |

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher purchase deleted successfully"
  },
  "data": null
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |
| **404**   | VOUCHER_PURCHASE_NOT_FOUND        | "Voucher purchase not found"     |

---

### POST /voucher-purchase/

### Richiesta

#### Headers
```
{
  Authorization: Bearer <token>
}
```

#### Body
```
{
    "user_id": number,
    "voucher_id": number,
    "price_option": string,
    "date": string,
    "quantity": number
}
```

### Risposta

#### Status code HTTP
200

#### Body
```
{
  "success": true,
  "result": {
    "message": "Voucher purchases fetched successfully"
  },
  "data": {
      "id": number,
      "user_id": number,
      "voucher_id": number,
      "price_option": string,
      "date": string,
      "quantity": number
    }
}
```

### Errore nella richiesta
| HTTP Code | Code                | Message                |
|-----------|----------------------|-------------------------|
| **500**   | INTERNAL_SERVER_ERROR | "Internal Server Error" |
| **400**   | INVALID_PARAMS        | "Invalid parameters"     |
| **401**   | INVALID_TOKEN        | "Invalid token"     |