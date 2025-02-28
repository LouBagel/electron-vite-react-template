# 🚀 Electron + React + Vite App

This project is built using **Electron**, **React**, **Vite**, and **Tailwind CSS** for development and production.

---

## 📁 **Project Directory Structure**

Below is the general structure of the project:

```
project-root/
│── src/
│   ├── main/             # Electron main process files
│   │   ├── main.js       # Main Electron process entry file
│   │   ├── preload.js    # Preload script 
│   │   ├── modules/      # Additional modules for Electron
│   │   └── utils/        # Utility functions for Electron
│   ├── renderer/         # React front-end
│   │   ├── index.html    # Entry HTML file
│   │   ├── main.tsx      # React entry file
│   │   ├── App.tsx       # Main App component
│   │   ├── components/   # Reusable React components
│   │   ├── styles/       # Tailwind CSS styles
│   │   └── assets/       # Static assets (images, icons, etc.)
│
│── build/                # Output from the build process
│   ├── main/             # Copied Electron main process files
│   ├── renderer/         # Vite-compiled front-end files
│
│── dist/                 # Packaged Electron app (final installable files)
│
│── public/               # Static public assets
│── package.json          # Project metadata and dependencies
│── vite.config.ts        # Vite configuration
│── tailwind.config.js    # Tailwind CSS configuration
│── tsconfig.json         # TypeScript configuration
│── .gitignore            # Files and folders to ignore in Git
```

---

## 📝 Scripts

| Command             | Description |
|---------------------|---------------------------------------------|
| `npm run dev`      | 🚀 Start development mode (live reload).       |
| `npm run dev:renderer` | 🎨 Start only the **renderer** (React + Vite). |
| `npm run dev:main` | ⚙️ Start only the **Electron main process**.   |
| `npm run build`    | 📦 Build the **renderer** for production.      |
| `npm run start`    | 🖥️ Run the **built Electron app**.             |
| `npm run dist`     | 📦 Package the app into an **installable format**. |
| `npm run clean`    | 🧹 Remove build & dist files before a new build. |
| `npm run postinstall` | 📦 Ensures Electron dependencies are installed. |


---

## 🛠️ **Workflow**

### 🛠️ **Development Mode**
```bash
npm run dev
```
Runs the dev environment with **live reload**.

Vite does not need to compile anything to run in dev mode. Therefore, you will not see anything created or any changes to the files in the build folder. This is also why the Electron backend is in js files rather than ts files - now no compilation is needed at all during dev mode.

- **Uses `concurrently`** to run both the **renderer** and **Electron main process**.
- **Renderer**:
  - Runs **Vite** to start the dev server and load the React app at [`http://localhost:5173`](http://localhost:5173).
- **Main Process**:
  - 🚀 **Runs directly from `src/main/main.js` (No TypeScript compilation needed!)**
  - Uses `cross-env NODE_ENV=development` to signal Electron to load the local dev server.
  - Uses `electronmon` to start Electron and watch for changes.
  - **Hot Module Replacement (HMR)** ensures front-end updates apply instantly.

---

### 📦 **Build for Production**
```bash
npm run build
```
Compiles the **Electron app** and **React front-end** for production.

📝 **Note:** If your goal is to distribute the Electron app, you can skip this step and run `npm run dist` instead, as **the build step is included in the distribution command**.

#### **Why Use This?**
- Useful for **production testing**.
- Allows inspection of **compiled files** before packaging.

#### **Output (`build/` directory)**
| Folder    | Description |
|-----------|-------------|
| **`build/main/`** | Copies all Electron main process files from `src/main/`. |
| **`build/renderer/`** | Vite compiles React and TypeScript into this folder. |

📝 **The `dist/` folder is reserved for the final packaged Electron app.**

---

### 📦 **Distribute the App**
```bash
npm run dist
```
- Runs `npm run build` to prepare the compiled files.
- Uses **Electron Builder** to package the app into an **installable format** (e.g., `.exe`, `.dmg`, `.AppImage`).
- **Output:** The final packaged files are stored in the `dist/` directory.

---

## 📦 **Project Dependencies Breakdown**

This project uses **Electron**, **React**, **Vite**, **Tailwind CSS**, and various utilities for development, bundling, and formatting.

---

### 🛠️ **Dependencies (Used in Production)**
These packages are required for the app to function when built and distributed.

| Package        | Purpose |
|---------------|---------|
| **react**     | Core library for building the front-end UI. |
| **react-dom** | Enables React to render components in the DOM. |

---

### 🛠️ **DevDependencies (Used for Development & Build Process)**
These packages are only needed during development and building the app.

| Package                      | Purpose |
|------------------------------|---------|
| **@tailwindcss/vite**        | Vite plugin for Tailwind CSS integration. |
| **@types/node**              | Type definitions for Node.js (helps with IntelliSense & TypeScript compatibility). |
| **@types/react**             | Type definitions for React (used for TypeScript support). |
| **@types/react-dom**         | Type definitions for ReactDOM. |
| **@vitejs/plugin-react**     | Enables React support in Vite. |
| **autoprefixer**             | Adds vendor prefixes to CSS for better browser support. |
| **concurrently**             | Runs multiple scripts at the same time (used for `npm run dev`). |
| **cross-env**                | Ensures environment variables work across different OS platforms. |
| **electron**                 | Core Electron package to run the desktop app. |
| **electron-builder**         | Used to package the app into an installable format (.exe, .dmg, etc.). |
| **electronmon**              | Live reload tool for the Electron main process. |
| **eslint**                   | Ensures code consistency and catches errors in JavaScript/TypeScript. |
| **eslint-config-prettier**   | Disables conflicting ESLint rules when using Prettier for formatting. |
| **eslint-plugin-react**      | ESLint rules specific to React. |
| **prettier**                 | Code formatter for consistent style. |
| **tailwindcss**              | CSS framework for styling. |
| **typescript**               | TypeScript compiler for type safety. |
| **vite**                     | Fast front-end bundler and dev server for React. |
| **vite-plugin-static-copy**  | Copies static files (like `main.js` & `preload.js`) to the build folder. |

---

