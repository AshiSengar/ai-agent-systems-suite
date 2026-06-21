const fs = require("fs");
const axios = require("axios");
const express = require("express");
const cors = require("cors");

const { createPlan } = require("./planner");
const { interviewPrep } = require("./skills");

const LOG_FILE = "agent-log.txt";
const MESSAGE_FILE = "agent-messages.txt";

// 🔐 SAFE: use environment variable
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

// Express setup
const app = express();
app.use(cors());
app.use(express.json());

// Load Memory
let memory = {};
try {
  memory = JSON.parse(fs.readFileSync("memory.json", "utf8"));
} catch (err) {
  memory = {
    userName: "User",
    lastTask: "interview prep",
    completedTasks: []
  };
}

if (!memory.completedTasks) {
  memory.completedTasks = [];
}

// Agent Communication
function sendAgentMessage(message) {
  fs.appendFileSync(
    MESSAGE_FILE,
    `[${new Date().toISOString()}] ${message}\n`
  );
  console.log("\nAGENT MESSAGE:");
  console.log(message);
}

// Slack Communication
async function sendSlackMessage(message) {
  if (!SLACK_WEBHOOK) {
    console.log("⚠️ Slack webhook not set. Skipping Slack message.");
    return;
  }
  try {
    await axios.post(SLACK_WEBHOOK, { text: message });
    console.log("SLACK MESSAGE SENT");
  } catch (error) {
    console.log("Slack Error:", error.message);
  }
}

console.log("=== HERMES AGENT ===");

// Memory Recall
console.log("\n=== MEMORY RECALL ===");
console.log("User:", memory.userName || "Unknown");
console.log("Last Task:", memory.lastTask || "None");

// Planning
console.log("\n=== PLAN ===");
let plan = [];
try {
  plan = createPlan(memory.lastTask || "");
} catch (err) {
  console.log("Plan error:", err.message);
  plan = ["No plan generated"];
}

plan.forEach((step, index) => {
  console.log(`${index + 1}. ${step}`);
});

// Skill Trigger
console.log("\n=== SKILL OUTPUT ===");
if (
  memory.lastTask &&
  memory.lastTask.toLowerCase().includes("interview")
) {
  console.log(interviewPrep());
  sendAgentMessage("Interview Preparation Skill Completed");
  sendSlackMessage("Hermes Agent: Interview Preparation Skill Completed");
} else {
  console.log("No matching skill found");
}

// Learning Loop
memory.completedTasks.push({
  task: memory.lastTask || "unknown task",
  completedAt: new Date().toISOString()
});

memory.lastRun = new Date().toISOString();
fs.writeFileSync("memory.json", JSON.stringify(memory, null, 2));

// Logs
fs.appendFileSync(
  LOG_FILE,
  `[${new Date().toISOString()}] Hermes executed successfully\n`
);

// Status
console.log("\n=== STATUS REPORT ===");
console.log("User:", memory.userName || "Unknown");
console.log("Current Task:", memory.lastTask || "None");
console.log("Status: Completed");

// Slack Status
sendSlackMessage(
`Hermes Status:
User: ${memory.userName || "Unknown"}
Task: ${memory.lastTask || "None"}
Status: Completed`
);

// Autonomous check
setTimeout(() => {
  console.log("\nChecking previous executions...");
  console.log("Tasks completed:", memory.completedTasks.length);

  sendSlackMessage(
`Hermes Autonomous Check:
Tasks Completed: ${memory.completedTasks.length}`
  );

  console.log("\nAGENT FINISHED EXECUTION (RENDER SAFE MODE)");
}, 5000);

// =========================
// 🚀 EXPRESS SERVER FIX
// =========================

// health route
app.get("/", (req, res) => {
  res.send("Hermes Agent Running");
});

// 🔥 IMPORTANT: frontend API
app.get("/cards", (req, res) => {
  res.json([
    { title: "Task 1", description: "Build UI" },
    { title: "Task 2", description: "Connect Backend" },
    { title: "Task 3", description: "Submit Project" }
  ]);
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
