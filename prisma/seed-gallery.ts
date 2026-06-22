import { PrismaClient } from "@prisma/client";
import { readdirSync } from "fs";
import { join, parse } from "path";

const prisma = new PrismaClient();
const uploadsDir = join(process.cwd(), "public", "uploads");

const skip = new Set(["dsCCHSS.png", "NewCanvas10AFWBFB.png"]);

async function main() {
  const files = readdirSync(uploadsDir).filter(
    (f) => /\.(png|jpg|jpeg|webp)$/i.test(f) && !skip.has(f)
  );

  let count = 0;
  for (const file of files) {
    const name = parse(file).name;
    const existing = await prisma.artwork.findFirst({ where: { imageUrl: `/uploads/${file}` } });
    if (existing) continue;

    await prisma.artwork.create({
      data: {
        title: name,
        imageUrl: `/uploads/${file}`,
        tags: [],
        position: count,
      },
    });
    count++;
  }

  console.log(`Added ${count} artworks from uploads/`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
