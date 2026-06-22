import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  url: string;
  fileName: string;
}

/**
 * Validate a file against allowed MIME types and max size.
 */
export function validateFile(
  file: File
): { valid: true } | { valid: false; error: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: "Invalid file type. Allowed: JPEG, PNG, WebP" };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File too large. Maximum size is 10MB" };
  }
  return { valid: true };
}

/**
 * Save an uploaded file to the local filesystem and return its public URL.
 */
export async function saveImageLocally(file: File): Promise<UploadResult> {
  const ext = path.extname(file.name) || ".jpg";
  const fileName = `${crypto.randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  return {
    url: `/uploads/${fileName}`,
    fileName,
  };
}

/**
 * Unified upload interface.
 * In production with Uploadthing, swap this implementation.
 * For now, saves locally.
 */
export async function uploadImage(file: File): Promise<UploadResult> {
  return saveImageLocally(file);
}
