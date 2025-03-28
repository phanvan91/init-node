
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
yarn dev
# or
npm run dev
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
node make-module.js User
```

Example:
```bash
node make-module.js Product
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

## 📄 Available Commands

| Command | Description |
|----|----|
| `yarn dev` / `npm run dev` | Start the development server with auto-reload |
| `node make-module.js ModuleName` | Generate a new module structure |

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
├── make-module.js
├── .env
├── .env.example
└── README.md
```

---

## 🚀 Happy Coding!
