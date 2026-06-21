# 🤖 AI Agent Systems Suite

## 📌 Overview
A modular Node.js-based agent system that executes tasks using a structured agent workflow:
Planner → Skills → Memory → Output

The system is built using two starter frameworks:
- Starter 1: OpenClaw
- Starter 2: Hermes

---

## 🧠 Workflow

Input
  ↓
🧩 Planner (Task Breakdown)
  ↓
⚙️ Skills (Execution Layer)
  ↓
💾 Memory (Context Storage)
  ↓
📤 Output

---

## ⚙️ Tech Stack

### Starter 1
- OpenClaw framework
- Node.js
- JavaScript (ES6)
- JSON (Memory Storage)

### Starter 2
- Hermes framework
- Node.js
- JavaScript (ES6)
- JSON (State & Memory Handling)

---

## 📁 Project Structure

ai-agent-systems-suite

├── index.js        - Main entry point

├── planner.js      - Task planning logic

├── skills.js       - Skill execution logic

├── memory.json     - Memory/context storage

├── package.json    - Project configuration

└── README.md

---

## 🔄 Modules

### index.js
Main controller that connects all modules and runs the workflow.

### planner.js
Breaks user input into structured steps for execution.

### skills.js
Executes defined logic based on planned steps.

### memory.json
Stores previous context and system memory.

---

## 🚀 Run Project

```bash
git clone https://github.com/AshiSengar/ai-agent-systems-suite.git
cd ai-agent-systems-suite
npm install
node index.js
