const { execSync } = require("child_process");

try {
  execSync("npx prisma db seed", { stdio: "inherit" });
} catch {
  console.warn("Seed skipped or failed — continuing startup");
}

const { spawn } = require("child_process");
spawn("next", ["start"], { stdio: "inherit", shell: true });
