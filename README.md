
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
