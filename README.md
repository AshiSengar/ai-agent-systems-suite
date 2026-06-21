# 🤖 AI Agent Systems Suite

## 📌 Overview

AI Agent Systems Suite is a modular Node.js based AI agent system that demonstrates a planner + execution architecture.

It takes user input, breaks it into structured steps, executes those steps using skill modules, and maintains lightweight memory for context tracking across runs.

---

## 📁 Project Structure

ai-agent-systems-suite/

├── 🧠 starter2-hermes 
    ├── index.js  
│   ├── planner.js  
│   ├── skills.js  
│   ├── memory.json  
│   ├── agent-log.txt  
│   ├── agent-messages.txt  

├── ⚡ starter1-openclaw 
   ├── index.js  

├──  package.json  
├──  package-lock.json  
├──  README.md  

---

## ⚙️ Architecture

### 🧠 Hermes (Planner Layer)
- Input analyze karta hai  
- Task ko structured steps me break karta hai  
- Execution plan generate karta hai  

### ⚡ OpenClaw (Execution Layer)
- Planner ke steps execute karta hai  
- Skills modules ko run karta hai  
- Final output generate karta hai  

### 🧩 Skills Layer
- Task-specific logic handle karta hai  
- Reusable functional modules provide karta hai  
- Handles:
  - Interview preparation  
  - Text processing  
  - Memory update  
  - Response generation

### 🛠 Tech Stack
 Node.js — runtime environment
 JavaScript (ES6+) — core logic
 File System (fs module) — file handling
 JSON — lightweight memory storage
 Axios — API / webhook communication
 Modular architecture — planner + executor separation

### 🧩 Features
 AI-style planner system
 Execution engine separation
 Modular skill-based architecture
 Persistent memory system
 Structured workflow pipeline
 Easy to extend and scale
 Context-aware responses (via memory)

### 💾 Memory Layer
- System context store karta hai  
- Tracks:
  - User name  
  - Last task  
  - Completed task history  

---

## 🔄 Workflow

User Input → Hermes Planner → Task Breakdown → OpenClaw Execution → Skills Processing → Memory Update → Output Generation  

---

## 🧠 Memory Example

```json
{
  "userName": "Ashi",
  "lastTask": "interview prep",
  "completedTasks": []
}
