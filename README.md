# 📘 DocuGen – AI-Powered Documentation Generator

DocuGen is a fullstack web app that generates intelligent documentation for GitHub repositories based on selected personas (Beginner, Intermediate, Expert). It also supports real-time chat-based refinement of generated docs using GPT.

## 🛠 Tech Stack
- **Frontend**: React (inside `src/`)
- **Backend**: Express (`servernew.js`)
- **ML Service**: Calls a hosted API to extract summaries from GitHub code
- **AI**: OpenAI GPT-4 (via `/generate-docs` and `/chat` routes)

## 🚀 Main Features
- Submit any public GitHub repo URL
- Choose your learning persona
- Get contextual project documentation
- Chat with the AI to refine/clarify the docs

## 📂 Code Overview
- `servernew.js`: Main Express backend file (routes, GPT & ML API calls)
- `src/`: All React components and logic
- `App.js`: Core frontend logic – UI layout, API calls, chat interface
- `public/`: Static HTML template and assets
- `build/`: Auto-generated production build (served via Express)

## 🌐 Deployment Notes
- Backend and frontend are served from the **same Render app**
- All `fetch()` calls use **relative paths** like `/generate-docs`
- Static React app is served using:

### 1. To Run Locally

```bash
npm install
npm run build
node servernew.js
```
### 2. Start React APP

```bash
npm start
```

