import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
const a = await p.admin.findUnique({ where: { email: "admin@alantart.dev" } });
console.log(a ? "FOUND: " + a.email : "NOT_FOUND");
await p.$disconnect();
