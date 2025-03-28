
# 🚀 NodeJS Modular Project

A clean & structured NodeJS project inspired by Laravel's architecture, using **Express**, **Sequelize**, and fully modularized (Controllers, Services, Jobs, Middleware, Requests, Models).

---

## 📌 Requirements

- **Node.js**: `v22.14.0`
- **Package Manager**: `Yarn` (recommended) or `npm`
- **Dev Tools**:
    - `nodemon` (auto reload when code changes)

---

## 🛠️ Installation & Development

```bash
# Clone project
git clone https://github.com/your-repo/your-project.git
cd your-project

# Install dependencies
yarn
# hoặc
npm install

# Copy environment file
cp .env.example .env

# Start development server (auto-reload)
yarn dev
# hoặc
npm run dev
```
Server sẽ chạy tại:
```
http://localhost:9000
```

---

## 🧩 Module Generator

Project đã có sẵn **Module Generator Script** giống Laravel Artisan:

**Tạo module mới:**
```bash
node make-module.js User
```

Ví dụ:
```bash
node make-module.js Product
```

Nó sẽ tự tạo structure:
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
| `yarn dev` / `npm run dev` | Start development server (auto reload) |
| `node make-module.js ModuleName` | Generate new module structure |

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
