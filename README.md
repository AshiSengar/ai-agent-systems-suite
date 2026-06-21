# 🤖 AI Agent Systems Suite

## 📌 Overview

This project is a modular Node.js-based AI agent system built using two starter frameworks:

- Starter 1: OpenClaw (Execution Layer)
- Starter 2: Hermes (Planning & Orchestration Layer)

The system demonstrates a structured agent workflow where tasks are planned, executed, and stored with contextual memory.

---

## 🧠 System Architecture

### 🔵 Starter 2 — Hermes (Planner / Brain Layer)
- Handles task understanding and breakdown
- Creates structured execution plans
- Acts as the decision-making layer of the system

### 🟢 Starter 1 — OpenClaw (Execution Layer)
- Executes planned instructions
- Runs defined skill-based logic
- Produces final output

---

## ⚙️ Tech Stack

- Node.js
- JavaScript (ES6)
- JSON (Memory storage)
- File-based modular architecture

---

## 🔄 Workflow

Input → Hermes (Planner) → OpenClaw (Skills Execution) → Memory → Output

---

## 📁 Project Structure

ai-agent-systems-suite/

├── starter2-hermes/
│   ├── index.js
│   ├── planner.js
│   ├── skills.js
│   ├── memory.json
│   └── skills/
│
├── starter1-openclaw/
│   └── execution layer logic
│
└── README.md

---

## 🧩 Core Modules

### planner.js
Breaks input into structured steps for execution.

### skills.js
Executes logic based on planned steps.

### memory.json
Stores and retrieves contextual memory across runs.

---

## 💾 Memory System

The system uses a simple file-based memory mechanism.

Example:

Input: "My name is Ashi"
→ Stored in memory.json

Input: "What is my name?"
→ Retrieved from memory
→ Output: "Ashi"

---

## ⚙️ Skills System

Skills are modular logic units triggered based on input type.

Examples:
- Greeting handler
- Text parsing
- Data transformation
- Memory read/write operations

Each skill:
- Receives structured input
- Processes logic independently
- Returns output to workflow

---

## 🔗 Agent Interaction Model

- Hermes acts as the planner and orchestration layer
- OpenClaw acts as the execution layer
- Planner ensures structured breakdown before execution
- Memory maintains context across runs

This represents a lightweight multi-agent architecture within a single Node.js system.

---
