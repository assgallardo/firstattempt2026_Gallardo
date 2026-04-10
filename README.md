## Gallardo

#### Framework: Angular JS

#### Module: Job Posting

#### Installation

# Career Passport — Local Setup Guide

An AngularJS 1.x + Tailwind CSS career networking app. Follow the steps below to run it locally in VS Code using **Windows PowerShell**.

---

## Setup (Windows PowerShell — copy & paste)

```powershell
winget install OpenJS.NodeJS.LTS
```
> Close and reopen PowerShell after this step, then continue:

```powershell
npm install -g pnpm
git clone https://github.com/assgallardo/firstattempt2026_Gallardo
cd firstattempt2026_Gallardo
pnpm install
pnpm dev
```

Open your browser at **http://localhost:5173**

---

## Commands

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start dev server with hot-reload at localhost:5173 |
| `pnpm build` | Build production bundle into `/dist` |
| `pnpm preview` | Preview the production build locally |

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Split-screen sign-in with Google, SSO, or email |
| `/profile` | Profile | Passport, CV generator, skills, honors |
| `/jobs` | Job Search | Split-panel job list + detail view |

---

## Project Structure

```
firstattempt2026_Gallardo/
├── index.html
├── app.js
├── views/
│   ├── login.html
│   ├── profile.html
│   └── jobs.html
├── src/
│   └── styles/
│       ├── index.css
│       ├── tailwind.css
│       ├── theme.css
│       └── fonts.css
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Troubleshooting

**`pnpm` not recognised**
```powershell
npm install -g pnpm
```

**Port 5173 already in use**
```powershell
pnpm dev --port 3000
```

**`node` not recognised after install**
> Close and reopen PowerShell, then try again.

**Dependency install fails**
```powershell
pnpm store prune
pnpm install
```

**TypeScript errors in VS Code**
> `Ctrl + Shift + P` → *TypeScript: Select TypeScript Version* → *Use Workspace Version*

### AI Tools:

1. Chat GPT
1. Claude Sonnet 4.6
1. VS Code - Github CoPilot

### Prompt:

Convert the provided Figma design into a responsive web application using AngularJS (1.x) for structure and logic, and Tailwind CSS for styling. Maintain a clean, modern, and minimalist UI that strictly follows the original layout, spacing, typography, and color palette of the design.

🧩 Requirements:
Use AngularJS (1.x) with a modular structure:
Create components (or directives) for reusable UI elements (e.g., navbar, cards, buttons, modals).
Use controllers to manage state and logic.
Apply two-way data binding where needed.
Use Tailwind CSS for all styling:
Follow a blue-themed color palette
Ensure proper spacing, padding, and alignment
Use responsive utility classes for mobile-first design
📱 Responsiveness:
Ensure the layout works across:
Mobile devices
Tablets
Desktop screens
Maintain consistent spacing and visual hierarchy across all screen sizes
🎨 UI/UX Guidelines:
Keep the design clean and minimal
Maintain rounded corners, soft shadows, and proper whitespace
Use smooth transitions and hover states
Follow accessibility best practices (contrast, readable font sizes, button clarity)
⚙️ Functionality:
Implement navigation between screens/pages using AngularJS routing
Add interactive states:
Button hover and click feedback
Form inputs with validation
Use mock/static data where backend is not defined
📦 Output Structure:
Organize code into:
index.html
app.js (AngularJS module and routing)
controllers/
components/
Tailwind integrated via CDN or config
🚀 Additional Notes:
Optimize for performance and readability
Ensure code is clean, well-indented, and maintainable
Preserve all visual elements exactly as in the Figma design


## Screenshots

### Login Page
![Login Page](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20133736.png)

### Profile Page
![Profile Page](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20133742.png)

### Job Search
![Job Search](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20133747.png)
