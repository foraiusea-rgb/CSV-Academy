# CSV Academy — Pharma Computer System Validation Learning Platform

A comprehensive self-learning platform for **Computer System Validation (CSV)** in the pharmaceutical industry, built specifically for aspiring CSV Engineers targeting roles in **Ireland**.

## 🎯 What This Platform Covers

- **11 Course Modules** — From foundations to advanced topics, sourced from three reference textbooks + regulatory documents
- **30+ Quiz Questions** — With detailed explanations referencing specific book chapters
- **20+ Interview Questions** — Entry & Mid level with model answers
- **🎤 AI Mock Interview Mode** — Practice answering questions, scored by AI like a real interviewer
- **🧠 Feynman Technique Game** — Explain concepts simply, get AI-scored on accuracy/completeness/clarity
- **💻 6 Platform Simulators** — AI-powered scenarios for LIMS, KNEAT, SCADA/PLC, SAP ERP, MES, ValGenesis
- **🔀 6 Interactive Flowcharts** — CSV lifecycle, change control, deviation management, and more
- **🇮🇪 Ireland Job Tracker** — AI-powered CSV job search focused on Irish pharma market
- **📊 Persistent Dashboard** — Track all progress, quiz scores, Feynman scores, mock interview history

## 📚 Reference Books (Content Bibles)

1. **"Testing Computer Systems for FDA/MHRA Compliance"** — David Stokes (CRC Press, 2004)
2. **"Validating Corporate Computer Systems"** — Guy Wingate (Interpharm Press, 2000)
3. **"Validating Pharmaceutical Systems"** — John Andrews (CRC Press/Taylor & Francis, 2005)

Plus: 21 CFR Part 11, EU GMP Annex 11, GAMP 5 (2nd Ed), ICH Q9, FDA CSA Guidance 2025

## 🚀 Deploy to Vercel

### Option 1: GitHub → Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → select your GitHub repo
4. Framework: **Vite**
5. Click Deploy — done!

### Option 2: Vercel CLI

```bash
npm install -g vercel
cd csv-academy
npm install
vercel
```

## 🛠 Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## ⚙️ AI Features Setup

The platform uses **OpenRouter API** for AI-powered features:
- Mock interview scoring
- Feynman technique evaluation
- Platform simulator scenarios
- Job search

To activate:
1. Get an API key from [openrouter.ai](https://openrouter.ai)
2. Go to Settings tab in the app
3. Paste your API key
4. Default model: `minimax/MiniMax-M1` (change to any OpenRouter model)

## 📁 Project Structure

```
csv-academy/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite build config
├── vercel.json             # Vercel routing
├── src/
│   ├── main.jsx            # React entry
│   ├── App.jsx             # Main application (all tabs/features)
│   ├── storage.js          # localStorage wrapper for persistence
│   └── data/
│       ├── courses.js      # 11 course modules with lessons
│       └── content.js      # Quizzes, interviews, simulators, flowcharts
└── public/                 # Static assets
```

## 💾 Data Persistence

All user progress is stored in the browser's localStorage:
- Lesson completion tracking
- Quiz score history
- Feynman technique scores
- Mock interview scores
- Simulator completions
- API key (stored locally only)

Data persists across sessions and is only cleared when the user explicitly resets via Settings.

## 🇮🇪 Ireland Focus

The platform emphasizes:
- EU GMP Annex 11 (Ireland's primary regulation)
- HPRA (Ireland's regulatory authority)
- KNEAT (Limerick) and ValGenesis (Dublin) — Irish validation platforms
- Major Irish pharma employers (Pfizer, Lilly, MSD, J&J, AbbVie, etc.)
- Ireland-specific interview preparation

## License

Educational use. Course content is original synthesis based on publicly available regulatory documents and referenced textbooks.
