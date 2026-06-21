const fs = require("fs");
const axios = require("axios");
const http = require("http");
const { createPlan } = require("./planner");
const { interviewPrep } = require("./skills");

const LOG_FILE = "agent-log.txt";
const MESSAGE_FILE = "agent-messages.txt";

// 🔐 SAFE: use environment variable
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

// Load Memory (SAFE)
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

// Ensure completedTasks exists
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

console.log("\nCompleted Tasks:", memory.completedTasks.length);

// Update Memory
memory.lastRun = new Date().toISOString();

fs.writeFileSync("memory.json", JSON.stringify(memory, null, 2));

// Log
fs.appendFileSync(
  LOG_FILE,
  `[${new Date().toISOString()}] Hermes executed successfully\n`
);

// Status Report
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

console.log("\n=== AUTONOMOUS CHECK ===");

setTimeout(() => {
  console.log("\nChecking previous executions...");
  console.log("Tasks completed:", memory.completedTasks.length);

  sendSlackMessage(
`Hermes Autonomous Check:
Tasks Completed: ${memory.completedTasks.length}`
  );

  console.log("\nAGENT FINISHED EXECUTION (RENDER SAFE MODE)");
}, 5000);

//  Render Server (IMPORTANT FIX)
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hermes Agent Running");
}).listen(PORT, () => {
  console.log("Server running on port " + PORT);
});