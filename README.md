# MarketMind

MarketMind is a full-stack AI-powered conversational research platform being built from scratch to deeply learn modern AI engineering.

The project currently supports:

* Streaming AI chat
* Persistent conversations
* Multi-chat sidebar
* Local LLM inference using Ollama
* FastAPI backend
* Next.js frontend
* SQLite persistence
* LangGraph integration
* Markdown rendering

---

# Vision

MarketMind is intended to evolve into a financial AI research platform capable of:

* Financial document analysis
* Earnings report analysis
* RAG (Retrieval Augmented Generation)
* Multi-agent workflows
* Research copilots
* Semantic search over uploaded documents
* Grounded financial reasoning

---

# Current Architecture

```text
Frontend (Next.js)
    ↓
Streaming Fetch API
    ↓
FastAPI Backend
    ↓
LangChain / LangGraph
    ↓
Ollama Local LLM
    ↓
SQLite Persistence
```

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* FastAPI
* LangChain
* LangGraph
* SQLAlchemy
* SQLite

## AI Stack

* Ollama
* Llama 3

---

# Features Implemented

## AI Chat

* Streaming token responses
* Conversational context
* Markdown rendering
* Auto-scroll
* Enter-to-send support

## Persistence

* SQLite database
* Persistent conversations
* Conversation restoration
* Sidebar navigation
* Multi-conversation support

## UI/UX

* Conversation sidebar
* Active conversation highlighting
* Delete conversation support
* Conversation previews
* Responsive chat layout

---

# Folder Structure

```text
marketmind/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── graph/
│   │   ├── models/
│   │   └── services/
│
└── README.md
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone git@github.com:iamadisinghal/MarketMind.git
cd MarketMind
```

---

# Backend Setup

## 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

## 2. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup

## 1. Install Dependencies

```bash
cd frontend
npm install
```

---

## 2. Run Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

# Ollama Setup

## Install Ollama

Official website:

urlOllama[https://ollama.com](https://ollama.com)

---

## Pull Llama 3

```bash
ollama pull llama3
```

---

## Run Model

```bash
ollama run llama3
```

---

# Database

Current database:

```text
SQLite
```

Database file:

```text
backend/marketmind.db
```

Future migration planned:

* PostgreSQL

---

# Upcoming Features

## Phase 2 — RAG Architecture

* PDF upload
* Embeddings
* Vector database
* Semantic retrieval
* Financial report analysis

## Phase 3 — Multi-Agent System

* Planner agent
* Research agent
* Critic agent
* Summarization workflows

## Phase 4 — Production Infrastructure

* Docker
* PostgreSQL
* Authentication
* Deployment
* Monitoring

---

# Learning Goals

This project is intentionally being built step-by-step to deeply learn:

* Full-stack engineering
* AI infrastructure
* Streaming systems
* Vector databases
* Retrieval systems
* AI orchestration
* Product architecture
* Modern frontend engineering
* Backend API design

---

# Development Notes

This project is currently under active development.
The architecture and README will evolve continuously as new systems are added.

---

# Current Status

## Completed

* Full-stack streaming AI chat
* Persistent conversations
* Sidebar-based chat history
* Local LLM integration
* SQLite persistence
* Markdown rendering
* Conversation restoration

## In Progress

* RAG system architecture
* Financial intelligence workflows
* Better product UX
