[README.MD](https://github.com/user-attachments/files/26618808/README.MD)
# firstattempt2026_Gallardo

#### Framework: Angular JS

#### Module: Job Posting

#### Installation

# Career Passport — Local Setup Guide

A React + Tailwind CSS career networking app. Follow the steps below to run it locally in VS Code using **Windows PowerShell**.

---

## Setup (Windows PowerShell — copy & paste)

```bash
winget install OpenJS.NodeJS.LTS
nvm install lts
nvm use lts
npm install -g pnpm
git clone <your-repo-link-here>
cd <your-repo-folder-name>
pnpm install
pnpm dev
```

The app will open automatically at **http://localhost:5173**

---

## App Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Login | Sign in with email, Google, or SSO |
| `/profile` | Profile | User passport, CV generator, skills |
| `/jobs` | Job Search | Browse, filter, and apply for jobs |
| `/network` | Network | Connections and discover people |
| `/messages` | Messages | Chat with connections |
| `/applied` | Applications | Track your job applications |

---

## All Available Commands

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start dev server with hot-reload at localhost:5173 |
| `pnpm build` | Build optimised production bundle into `/dist` |
| `pnpm preview` | Preview the production build locally |

---

## Project Structure

```
career-passport/
├── index.html              ← Vite HTML entry point
├── src/
│   ├── main.tsx            ← React root render
│   ├── app/
│   │   ├── App.tsx         ← Root component + Router
│   │   ├── routes.tsx      ← All page routes
│   │   └── components/
│   │       ├── LoginPage.tsx
│   │       ├── ProfilePage.tsx
│   │       ├── JobSearchPage.tsx
│   │       ├── NetworkPage.tsx
│   │       ├── MessagesPage.tsx
│   │       ├── AppliedPage.tsx
│   │       ├── BottomNav.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   └── styles/
│       ├── index.css       ← Global CSS entry
│       ├── tailwind.css    ← Tailwind v4 import
│       ├── theme.css       ← Design tokens
│       └── fonts.css       ← Font imports
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Troubleshooting

**`nvm` not recognised after installing Node**
> Close and reopen PowerShell, then try again.

**Port 5173 already in use**
```bash
pnpm dev --port 3000
```

**Dependency install fails**
```bash
pnpm store prune
pnpm install
```

**TypeScript errors in VS Code**
> Open the Command Palette (`Ctrl + Shift + P`) → *"TypeScript: Select TypeScript Version"* → *"Use Workspace Version"*

---

## Screenshots

### Login Page
![Screenshot 1](./screenshots/Screenshot%202026-04-10%20113804.png)

### Dashboard
![Screenshot 2](./screenshots/Screenshot%202026-04-10%20113818.png)

### Job Search
![Screenshot 3](./screenshots/Screenshot%202026-04-10%20113829.png)

### Job Details
![Screenshot 4](./screenshots/Screenshot%202026-04-10%20113834.png)

### Profile Page
![Screenshot 5](./screenshots/Screenshot%202026-04-10%20113846.png)

### Network Page
![Screenshot 6](./screenshots/Screenshot%202026-04-10%20113854.png)

### Messages Page
![Screenshot 7](./screenshots/Screenshot%202026-04-10%20113905.png)

---

### AI Tools:

1. Chat GPT
1. Claude 4.6
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

#### Screenshots

"Create an image folder in your root directory and place all screenshots their. You can use the image tag to show the image. Follow this [link]("https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images")"
