import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@alantart.dev";
  const password = "5369dos";

  // Verify existing admin
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    const valid = await bcrypt.compare(password, existing.passwordHash);
    console.log(`Admin exists: ${existing.email}, password valid: ${valid}`);
    if (!valid) {
      console.log("Re-hashing password...");
      const hash = await bcrypt.hash(password, 12);
      await prisma.admin.update({ where: { email }, data: { passwordHash: hash } });
      console.log("Password re-hashed");
    }
  } else {
    const hash = await bcrypt.hash(password, 12);
    const admin = await prisma.admin.create({ data: { email, passwordHash: hash } });
    console.log(`Admin creado: ${admin.email}`);
  }

  const categories = [
    { name: "Stickers", basePrice: 5, headshotPrice: 5, halfbodyPrice: null, fullbodyPrice: null, sortOrder: 1 },
    { name: "SFW", basePrice: 15, headshotPrice: 15, halfbodyPrice: 25, fullbodyPrice: 40, sortOrder: 2 },
    { name: "NSFW", basePrice: 25, headshotPrice: 25, halfbodyPrice: 35, fullbodyPrice: 55, sortOrder: 3 },
    { name: "Parejas", basePrice: 30, headshotPrice: 30, halfbodyPrice: 45, fullbodyPrice: 65, sortOrder: 4 },
  ];

  for (const cat of categories) {
    await prisma.commissionCategory.upsert({
      where: { id: cat.name },
      update: cat,
      create: { id: cat.name, ...cat },
    });
  }

  console.log("Categorías de comisiones creadas");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
