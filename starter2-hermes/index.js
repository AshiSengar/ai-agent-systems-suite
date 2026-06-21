const fs = require("fs");
const { createPlan } = require("./planner");
const { interviewPrep } = require("./skills");

const LOG_FILE = "agent-log.txt";
const MESSAGE_FILE = "agent-messages.txt";

// Load Memory
let memory = JSON.parse(
  fs.readFileSync("memory.json", "utf8")
);

// Create completedTasks if missing
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

console.log("=== HERMES AGENT ===");

// Memory Recall
console.log("\n=== MEMORY RECALL ===");
console.log("User:", memory.userName);
console.log("Last Task:", memory.lastTask);

// Planning
console.log("\n=== PLAN ===");

const plan = createPlan(memory.lastTask);

plan.forEach((step, index) => {
  console.log(`${index + 1}. ${step}`);
});

// Skill Trigger
console.log("\n=== SKILL OUTPUT ===");

if (
  memory.lastTask
    .toLowerCase()
    .includes("interview")
) {
  console.log(interviewPrep());

  sendAgentMessage(
    "Interview Preparation Skill Completed"
  );
} else {
  console.log("No matching skill found");
}

// Learning Loop
memory.completedTasks.push({
  task: memory.lastTask,
  completedAt: new Date().toISOString()
});

console.log(
  "\nCompleted Tasks:",
  memory.completedTasks.length
);

// Update Memory
memory.lastRun = new Date().toISOString();

fs.writeFileSync(
  "memory.json",
  JSON.stringify(memory, null, 2)
);

// Agent Log
fs.appendFileSync(
  LOG_FILE,
  `[${new Date().toISOString()}] Hermes executed successfully\n`
);

// Status Report
console.log("\n=== STATUS REPORT ===");
console.log("User:", memory.userName);
console.log("Current Task:", memory.lastTask);
console.log("Status: Completed");

// Demo Scheduler
console.log("\n=== AUTONOMOUS CHECK ===");

setTimeout(() => {
  console.log("\nChecking previous executions...");
  console.log(
    "Tasks completed:",
    memory.completedTasks.length
  );

  console.log("\nFORCED STOP - DEMO MODE");
  process.exit(0);

}, 5000);