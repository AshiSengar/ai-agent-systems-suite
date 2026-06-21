const fs = require("fs");
const { createPlan } = require("./planner");
const { interviewPrep } = require("./skills");

let memory = JSON.parse(fs.readFileSync("memory.json", "utf8"));

console.log("=== HERMES AGENT ===");

console.log("\nMemory Recall:");
console.log("User:", memory.userName);
console.log("Last Task:", memory.lastTask);

console.log("\nPlan:");
const plan = createPlan(memory.lastTask);
plan.forEach((step, index) => {
  console.log(`${index + 1}. ${step}`);
});

console.log("\nSkill Output:");
console.log(interviewPrep());

console.log("\n=== AUTONOMOUS STATUS REPORT ===");
console.log("User:", memory.userName);
console.log("Current Task:", memory.lastTask);
console.log("Status: Completed (Test Mode)");

console.log("\nScheduler Started... (disabled for now)");

// SAFE DEBUG STOP (only for testing)
setTimeout(() => {
  console.log("\nFORCED STOP - DEBUG MODE");
  process.exit(0);
}, 3000);