const { execSync, spawnSync } = require("child_process");

try {
  execSync("npx prisma db push --accept-data-loss", { stdio: "inherit" });
} catch (e) {
  console.warn("Schema push failed — continuing startup");
}

try {
  execSync("npx prisma db seed", { stdio: "inherit" });
} catch (e) {
  console.warn("Seed skipped or failed — continuing startup");
}

const child = spawnSync("next", ["start"], { stdio: "inherit", shell: true });
process.exit(child.status);
