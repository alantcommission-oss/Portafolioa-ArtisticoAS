const { execSync, spawnSync } = require("child_process");

try {
  execSync("npx prisma db seed", { stdio: "inherit" });
} catch {
  console.warn("Seed skipped or failed — continuing startup");
}

spawnSync("next", ["start"], { stdio: "inherit", shell: true });
