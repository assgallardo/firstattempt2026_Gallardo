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

---

## PWA Conversion

### A. PWA Conversion Summary
- Added a web app manifest, service worker, and offline fallback page.
- Implemented cache versioning with install, activate, and fetch logging.
- Linked PWA metadata and icon references in the HTML entry point.

### B. Installation Steps
1. Add PWA icons to `/icons` (see required sizes below).
2. Run `pnpm install`.
3. Run `pnpm dev` or build/preview for production testing.

### C. How to Run Locally
```powershell
pnpm dev
```
Open **http://localhost:5173**. The PWA starts on the login screen via `/#!/login`.

### D. Features Added
- `manifest.json` with university color palette branding.
- `service-worker.js` with cache-first for static assets and network-first for navigation.
- `offline.html` fallback page.

### E. Master Prompt Used For This Conversion
Convert the existing AngularJS 1.x project into a production-ready PWA with a valid manifest, service worker registration, offline support, cache versioning, and documentation updates.

### F. Hallucinations / AI Mistakes / Manual Fixes Encountered
- No hallucinations observed.
- Icons generated from `assets/APP_HIREME_LOGO.png`.

### PWA Asset Checklist
Generated icon files under `/icons`:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `icon-512-maskable.png` (512x512, safe padding for maskable use)

---

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

### PWA Prompt
You are a senior full-stack developer helping me transform my existing web project into a fully functional Progressive Web App (PWA).

PROJECT CONTEXT:
- I already have an existing project inside VS Code.
- The project is stored in a public GitHub repository.
- I will create and work inside a new branch:
  git checkout -b feature/pwa-ready
- Do NOT break the existing project structure.
- Analyze the current codebase first before making changes.

YOUR TASK:
Convert my existing project into a production-ready PWA following professional standards.

MAIN OBJECTIVES:

1. CREATE A VALID manifest.json
- Generate a complete manifest.json file.
- Use university branding/theme colors.
- Include:
  - app name
  - short name
  - description
  - start_url
  - display: standalone
  - background_color
  - theme_color
  - orientation
  - icons (192x192 and 512x512 minimum)
- Make sure manifest is linked correctly in HTML.

2. REGISTER A SERVICE WORKER
- Create service-worker.js
- Register it properly in the main JS file.
- Ensure it only runs in supported browsers.
- Add clean console logs for install, activate, and fetch events.

3. IMPLEMENT CACHING STRATEGIES
Make the app load fast and work offline.

Use:
- Cache static assets (HTML, CSS, JS, images, fonts)
- Offline fallback page if needed
- Cache-first strategy for assets
- Network-first for dynamic data if applicable
- Automatically update old caches with versioning

4. APP ICON MANAGEMENT
- Detect where image assets are stored.
- Use existing branding kit assets if available.
- If icons are missing, tell me exactly what sizes to create.
- Optimize favicon + PWA icons.

5. CODEBASE SAFETY
- Do not rewrite unrelated files.
- Preserve current functionality.
- Explain every file you modify before changing it.
- Ask before deleting anything.

6. README DOCUMENTATION
Update README.md with:

A. PWA Conversion Summary
B. Installation Steps
C. How to Run Locally
D. Features Added
E. The Master Prompt used for this conversion
F. Hallucinations / AI mistakes / manual fixes encountered during development

7. OUTPUT FORMAT
Work step-by-step:

Step 1: Analyze current project structure  
Step 2: Identify files to modify  
Step 3: Implement manifest  
Step 4: Implement service worker  
Step 5: Add caching strategies  
Step 6: Validate installability  
Step 7: Update README  

8. IMPORTANT RULES
- Use modern best practices.
- Keep code clean and commented.
- If framework is detected (React, Vue, Next.js, Vite, etc.), adapt implementation properly.
- If plain HTML/CSS/JS, use vanilla implementation.
- Warn me of any errors or hallucinations.

Start by scanning my current project and telling me exactly what kind of app this is, what stack it uses, and the best PWA implementation plan.

## Screenshots

### Login Page
![Login Page](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20133736.png)

### Profile Page
![Profile Page](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20133742.png)

### Job Search
![Job Search](https://raw.githubusercontent.com/assgallardo/firstattempt2026_Gallardo/main/screenshots/Screenshot%202026-04-10%20133747.png)
