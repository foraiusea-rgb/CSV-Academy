# CSV Academy v5.0 — Pharma Computer System Validation Learning Platform

A comprehensive self-learning platform for **Computer System Validation (CSV)** in the pharmaceutical industry. Built for aspiring CSV Engineers targeting roles in **Ireland**.

## Features

| Feature | Description |
|---------|-------------|
| 📚 **11 Course Modules** | Foundations → Advanced, sourced from 3 textbooks + regulations |
| 🧠 **40 Quiz Questions** | Book-referenced, with wrong-answer tracking for spaced repetition |
| 🎯 **25 Interview Questions** | Entry + Mid level with model answers |
| 🎤 **AI Mock Interview** | Practice answering, AI scores 1-10 like a real interviewer |
| 🧠 **Feynman Technique Game** | Explain concepts simply, AI scores accuracy/completeness/clarity |
| 💻 **27 Simulator Scenarios** | LIMS, KNEAT, SCADA/PLC, SAP, MES, ValGenesis |
| 🎚️ **Risk Calculator** | Stokes' weighted scoring system (Ch.16) — interactive tool |
| 📖 **40-Term Glossary** | Searchable quick-reference from books + regulations |
| 🤖 **Ask AI Tutor** | Free-form questions with regulatory-referenced answers |
| 🔀 **8 Process Flowcharts** | SVG diagrams of key CSV workflows |
| 📅 **12-Week Study Plan** | Checkable tasks mapped to modules |
| 📝 **Lesson Notes** | Personal notes per lesson, persistently saved |
| 🏆 **Module Badges** | Completion badges shown on dashboard |
| 🔄 **Spaced Repetition** | Wrong quiz answers tracked, retry mode |
| 🔍 **Content Search** | Search across lessons and glossary |
| 🇮🇪 **Ireland Job Tracker** | AI-powered CSV job search |
| 📥 **Progress Export** | Download all progress as JSON |
| 📎 **Resources** | Direct links to regulations, guides, books |

## Reference Books

1. **Testing Computer Systems for FDA/MHRA Compliance** — David Stokes
2. **Validating Corporate Computer Systems** — Guy Wingate
3. **Validating Pharmaceutical Systems** — John Andrews

## Deploy to Vercel

1. Push to GitHub
2. [vercel.com](https://vercel.com) → Import → Framework: **Vite** → Deploy

```bash
# Local dev
npm install
npm run dev
```

## AI Features

Set your [OpenRouter](https://openrouter.ai) API key in Settings. Default model: `minimax/MiniMax-M1`.

## Project Structure

```
csv-academy/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── src/
│   ├── main.jsx
│   ├── App.jsx          # Main app (all 13 tabs)
│   ├── storage.js       # localStorage persistence
│   └── data/
│       ├── courses.js   # 11 modules, 24 lessons
│       └── content.js   # Quizzes, interviews, sims, flowcharts, glossary, risk calc, study plan, resources
└── public/
```

## Important

After extracting the zip, **delete** the `{public,src}` folder — it's a zip artifact. The real `src/` folder contains all source files.

All progress is stored in localStorage. Persists across sessions. Only cleared explicitly via Settings.
