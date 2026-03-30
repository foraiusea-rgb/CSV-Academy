# CSV Academy v6.0 — Pharma CSV Learning Platform

Complete rebuild with **deep course content** and **interactive simulator UIs**.

## What Changed from v5

| Area | v5 (old) | v6 (new) |
|------|----------|----------|
| Course depth | 158 words/lesson | **950+ words/lesson** (6x deeper) |
| Simulators | AI text generation | **Real interactive React UIs** |
| Exercises | None embedded | **Exercises with model answers in every lesson** |
| Learning objectives | None | **Per-lesson objectives + self-check** |

## Features

- **11 Course Modules** — Deep content from 3 reference books, with exercises and model answers
- **🔬 LIMS Simulator** — Interactive UI with 5 screens: Sample Registration, Results Entry (live OOS detection), OOS Investigation workflow, Audit Trail Viewer
- **40 Quiz Questions** — Wrong-answer tracking for spaced repetition
- **25 Interview Questions** — Entry + Mid level with AI mock interview scoring
- **Risk Calculator** — Stokes Ch.16 weighted scoring (interactive)
- **40-Term Glossary** — Searchable
- **8 Process Flowcharts** — SVG diagrams
- **12-Week Study Plan** — Checkable tasks
- **Feynman Game** — AI-scored concept explanation
- **🇮🇪 Ireland Job Tracker** — AI-powered search

## Deploy

1. Push to GitHub
2. Vercel → Import → Framework: **Vite** → Deploy

```bash
npm install && npm run dev
```

## AI Features

Set OpenRouter API key in Settings. Default model: `minimax/MiniMax-M1`.

## Structure

```
src/
├── App.jsx              # Main shell (12 tabs)
├── store.js             # localStorage persistence
├── data/
│   ├── module1.js       # Module 1: Deep content (37KB, 4 lessons, 3819 words)
│   ├── content.js       # All 11 modules + 40 quiz questions
│   └── tools.js         # Interview, glossary, risk calc, flowcharts, study plan
└── simulators/
    └── LIMSSimulator.jsx  # Interactive LIMS UI (5 screens, 30KB)
```
