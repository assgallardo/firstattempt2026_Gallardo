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
![Screenshot 1](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20121202.png)

### Dashboard
![Screenshot 2](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20121210.png)

### Job Search
![Screenshot 3](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20121214.png)

### Job Details
![Screenshot 4](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20121218.png)

### Profile Page
![Screenshot 5](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20121221.png)

### Network Page
![Screenshot 6](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20121224.png)

### Messages Page
![Screenshot 7](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20121229.png)
