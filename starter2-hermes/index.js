const fs = require("fs");
const { createPlan } = require("./planner");
const { interviewPrep } = require("./skills");

const LOG_FILE = "agent-log.txt";

// Load Memory
let memory = JSON.parse(
  fs.readFileSync("memory.json", "utf8")
);

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

// Automatic Skill Trigger
console.log("\n=== SKILL OUTPUT ===");

if (
  memory.lastTask
    .toLowerCase()
    .includes("interview")
) {
  console.log(interviewPrep());
} else {
  console.log("No matching skill found");
}

// Update Memory
memory.lastRun = new Date().toISOString();

fs.writeFileSync(
  "memory.json",
  JSON.stringify(memory, null, 2)
);

// Create Log Entry
fs.appendFileSync(
  LOG_FILE,
  `[${new Date().toISOString()}] Hermes executed successfully\n`
);

// Status Report
console.log("\n=== AUTONOMOUS STATUS REPORT ===");
console.log("User:", memory.userName);
console.log("Current Task:", memory.lastTask);
console.log("Status: Completed");

// Safe Exit
console.log("\nScheduler Started... (Demo Mode)");

setTimeout(() => {
  console.log("\nFORCED STOP - DEBUG MODE");
  process.exit(0);
}, 3000);