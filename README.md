# Metals Price Dashboard (React 19 + Vite)

A clean, modern, auto‑refreshing metals dashboard built with **React 19**, **Vite**, and a **Yahoo Finance proxy**.  
This project displays live prices for **Gold, Silver, Platinum, Palladium, and Copper**, complete with up/down indicators, forced two‑decimal formatting, and a polished UI suitable for portfolio‑grade presentation.

Live Demo: https://react-19-dashboard.netlify.app

---

## 🚀 Features

- **Live metals pricing** (Gold, Silver, Platinum, Palladium, Copper)
- **Auto‑refresh every 30 seconds**
- **Up/Down indicators** showing price movement
- **Rounded and formatted values** (always two decimals)
- **Hero header + intro section**
- **Clean, centered layout with premium styling**
- **Yahoo Finance proxy via Netlify redirects**
- **Fast Vite build + modern React hooks**

---

## 🛠️ Technologies Used

- **React 19**
- **Vite**
- **JavaScript (ES2023)**
- **Netlify** (CI/CD + hosting)
- **Yahoo Finance API** (via proxy)
- **CSS3** (custom styling)

---

## 📦 Project Setup

Install dependencies:

```bash
npm install

Run the development server:

```bash
npm run dev

Build for production:

npm run build

🔁 Yahoo Finance Proxy (Netlify)  
This project uses a Netlify redirect to safely proxy Yahoo Finance requests:  

netlify.toml:  
[[redirects]]  
  from = "/yahoo/*"  
  to = "https://query1.finance.yahoo.com/:splat"  
  status = 200  
  force = true  
This allows the app to fetch live metals data in both development and production.

metals-dashboard-react/  
│  
├── public/  
├── src/  
│   ├── App.jsx  
│   ├── App.css  
│   └── main.jsx  
│  
├── index.html  
├── package.json  
├── vite.config.js  
└── netlify.toml

🌐 Deployment
This project is deployed on Netlify using GitHub → Netlify continuous deployment.

Every push to main triggers an automatic rebuild and redeploy.

© 2026 MatthewLind.com
This project is part of my professional portfolio showcasing modern front‑end engineering, API integration, and clean UI/UX design.






