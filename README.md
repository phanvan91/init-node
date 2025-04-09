
# 🚀 NodeJS Modular Project

A clean and well-structured NodeJS project inspired by Laravel's architecture, using **Express**, **Sequelize**, and fully modularized with Controllers, Services, Jobs, Middleware, Requests, and Models.

---

## 📌 Requirements

- **Node.js**: `v22.14.0`
- **Package Manager**: `Yarn` (recommended) or `npm`
- **Development Tools**:
  - `nodemon` (for auto-reload when code changes)

---

## 🛠️ Installation & Development

```bash
# Clone the project
git clone https://github.com/your-repo/your-project.git
cd your-project

# Install dependencies
yarn
# or
npm install

# Copy environment variables file
cp .env.example .env

# Start the development server (auto-reload)
yarn artisan serve
# or
npm run artisan serve
```

The server will be running at:
```
http://localhost:9000
```

---

## 🧩 Module Generator

This project includes a **Module Generator Script** inspired by Laravel Artisan to quickly scaffold modules.

**Create a new module:**
```bash
yarn artisan make-module User
```

Example:
```bash
yarn artisan make-module Product
```

It will automatically generate the following structure:
```
modules/Product/
  ├── Controllers/ProductController.js
  ├── Services/ProductService.js
  ├── Jobs/ProductJob.js
  ├── Models/Product.js
  ├── Requests/ProductRequest.js
  └── Middleware/ProductMiddleware.js
```

---

## 📄 Available Artisan Commands

| Command | Description                              |
|----|------------------------------------------|
| `yarn artisan serve` | Start the development server with auto-reload |
| `yarn artisan make-module ModuleName` | Generate a new module structure          |
| `yarn artisan make:model ModelName` | Generate a new Sequelize model           |
| `yarn artisan make:migration MigrationName` | Generate a new migration file            |
| `yarn artisan migrate` | Run all migrations                       |
| `yarn artisan migrate:undo` | Rollback the last migration              |
| `yarn artisan seed` | Run all seeders                          |
| `yarn artisan tree-structure` | Run structure source                     |

---

## 📂 Project Structure

```
project-root/
├── modules/
│   ├── User/
│   │   ├── Controllers/
│   │   ├── Services/
│   │   ├── Jobs/
│   │   ├── Models/
│   │   ├── Requests/
│   │   └── Middleware/
├── routers/
│   └── api.js
├── models/
│   └── index.js
├── migrations/
├── seeders/
├── config/
├── core/
├── helpers/
├── make-module.js
├── artisan.js
├── .env
├── .env.example
└── README.md
```

---

## 🚀 Happy Coding!



## 🔐 JWT Authentication Setup

This system supports both token types:

### 1. HS256 (Secret Key)

**.env config:**
```
JWT_ALGORITHM=HS256
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```
No `.pem` file required. Uses a simple secret string.

---

### 2. RS256 (Private Key - PEM file)

**.env config:**
```
JWT_ALGORITHM=RS256
JWT_PRIVATE_KEY_PATH=./privates/keys/jwt.pem
JWT_EXPIRES_IN=1d
```

You need to generate a private key file at:  
`./privates/keys/jwt.pem`  
This is similar to Laravel Passport setup.

---

### 🎯 How to Use

**Generate Token**
```
POST /api/login
Response:
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5..."
}
```

**Verify Token**
```
GET /api/me
Authorization: Bearer {token}
Response:
{
  "message": "Token verified!",
  "user": { "id": 1, "name": "PhanVan", "iat": ..., "exp": ... }
}
```

---

### 📄 Auth Structure

```
config/auth.js            → JWT Configuration
app/auth/JWTCore.js       → Sign & verify tokens
app/auth/JWTGuard.js      → Parse token & get user data
middlewares/auth.js       → Middleware to protect routes
```



## 🔐 JWT Authentication Setup

This project supports both JWT algorithms:

### 1. HS256 (Secret Key)

**.env config:**
```
JWT_ALGORITHM=HS256
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

No .pem file needed, simple secret key based.

---

### 2. RS256 (Private Key - PEM file)

**.env config:**
```
JWT_ALGORITHM=RS256
JWT_PRIVATE_KEY_PATH=./privates/keys/jwt.pem
JWT_EXPIRES_IN=1d
```

You need to provide a private key file at:  
`./privates/keys/jwt.pem`

This is similar to how Laravel Passport works.

---

### 🎯 Usage

**Generate Token**
```
POST /api/login
Response:
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5..."
}
```

**Verify Token**
```
GET /api/me
Authorization: Bearer {token}
Response:
{
  "message": "Token verified!",
  "user": { "id": 1, "name": "PhanVan", "iat": ..., "exp": ... }
}
```

---

### 📄 Auth Structure

```
config/auth.js            → JWT configuration
app/auth/JWTCore.js       → Sign & verify tokens
app/auth/JWTGuard.js      → Parse token & get user data
middlewares/auth.js       → Middleware to protect routes
```
