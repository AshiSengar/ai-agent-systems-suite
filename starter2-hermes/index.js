const fs = require("fs");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const { createPlan } = require("./planner");
const { interviewPrep } = require("./skills");

// =========================
// CONFIG
// =========================
const LOG_FILE = "agent-log.txt";
const MESSAGE_FILE = "agent-messages.txt";
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

// =========================
// EXPRESS SETUP
// =========================
const app = express();
app.use(cors());
app.use(express.json());

// =========================
// MEMORY LOAD
// =========================
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

// =========================
// LOGGING
// =========================
function sendAgentMessage(message) {
  fs.appendFileSync(
    MESSAGE_FILE,
    `[${new Date().toISOString()}] ${message}\n`
  );
  console.log(message);
}

// =========================
// SLACK
// =========================
async function sendSlackMessage(message) {
  if (!SLACK_WEBHOOK) return;

  try {
    await axios.post(SLACK_WEBHOOK, { text: message });
  } catch (err) {
    console.log("Slack error:", err.message);
  }
}

// =========================
// CORE EXECUTION
// =========================
console.log("=== HERMES AGENT STARTED ===");

console.log("User:", memory.userName);
console.log("Last Task:", memory.lastTask);

// PLAN
let plan = [];
try {
  plan = createPlan(memory.lastTask || "");
} catch (e) {
  plan = ["No plan generated"];
}

plan.forEach((step, i) => {
  console.log(`${i + 1}. ${step}`);
});

// SKILL
if (memory.lastTask?.toLowerCase().includes("interview")) {
  console.log(interviewPrep());
  sendAgentMessage("Interview skill executed");
}

// UPDATE MEMORY
memory.completedTasks.push({
  task: memory.lastTask,
  time: new Date().toISOString()
});

memory.lastRun = new Date().toISOString();

fs.writeFileSync("memory.json", JSON.stringify(memory, null, 2));

// LOG FILE
fs.appendFileSync(
  LOG_FILE,
  `[${new Date().toISOString()}] executed\n`
);

// =========================
// ROUTES (IMPORTANT FOR RENDER)
// =========================
app.get("/", (req, res) => {
  res.send("Hermes Agent Running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/cards", (req, res) => {
  res.json([
    { title: "Task 1", description: "Build UI" },
    { title: "Task 2", description: "Connect Backend" },
    { title: "Task 3", description: "Deploy Project" }
  ]);
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
