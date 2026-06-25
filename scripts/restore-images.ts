import { PrismaClient } from "@prisma/client";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

const UPLOADS = join("public", "uploads");
const IMG_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.artwork.findMany({ select: { imageUrl: true } });
  const used = new Set(existing.map((a) => a.imageUrl));

  const files = readdirSync(UPLOADS).filter((f) => IMG_EXTS.has(extname(f).toLowerCase()));
  const missing = files.filter((f) => !used.has("/uploads/" + f));

  console.log(`Total files: ${files.length}, already in DB: ${files.length - missing.length}, missing: ${missing.length}`);

  for (const f of missing) {
    const stat = statSync(join(UPLOADS, f));
    const title = stat.birthtime.toISOString().slice(0, 16).replace("T", " ");
    await prisma.artwork.create({
      data: { title, imageUrl: "/uploads/" + f, tags: [], position: 999 },
    });
    console.log(`  Created: "${title}" ← ${f}`);
  }

  if (missing.length === 0) console.log("Everything synced.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
