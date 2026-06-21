# 🤖 AI Agent Systems Suite

## 📌 Overview

This project is a modular Node.js-based system that demonstrates a simple AI-agent style workflow using planning, execution, and memory handling.

It is built using two starter components:

- Starter 1: OpenClaw (Execution Layer)
- Starter 2: Hermes (Planning Layer)

The system follows a structured pipeline where input is processed, broken into steps, executed, and stored with context.

---

## 🧠 System Architecture

### 🔵 Starter 2 — Hermes (Planner Layer)
- Handles input interpretation and planning
- Breaks tasks into structured steps
- Coordinates overall workflow logic

### 🟢 Starter 1 — OpenClaw (Execution Layer)
- Executes logic defined by planner
- Runs modular skill-based functions
- Returns processed output

---

## ⚙️ Tech Stack

- Node.js
- JavaScript (ES6)
- JSON (Memory storage)
- File-based modular system

---

## 🔄 Workflow

Input → Planner (Hermes) → Skills Execution (OpenClaw) → Memory → Output

---

## 📁 Project Structure

ai-agent-systems-suite

├── starter2-hermes
│   ├── index.js
│   ├── planner.js
│   ├── skills.js
│   ├── memory.json
│   └── skills

├── starter1-openclaw
│   └── execution logic

└── README.md

---

## 🧩 Core Modules

### planner.js
Responsible for breaking input into structured steps for execution.

### skills.js
Executes logic based on planned steps.

### memory.json
Stores simple contextual memory and retrieves previous state.

---

## 💾 Memory System

This system uses a file-based memory approach.

Example:

Input: "My name is Ashi"
→ stored in memory.json

Input: "What is my name?"
→ retrieved from memory
→ output: stored value

---

## ⚙️ Skills System

Skills are simple modular functions that execute based on input type.

Examples:
- Greeting handling
- Text parsing
- Basic transformation logic
- Memory read/write operations

Each skill:
- Takes input from planner
- Processes logic independently
- Returns output

---

## 🔗 Agent Interaction Model

- Hermes handles planning and task breakdown
- OpenClaw handles execution of tasks
- Planner ensures structured flow
- Memory maintains context across runs

This simulates a lightweight single-process multi-agent architecture.

---
