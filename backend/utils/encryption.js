// backend/utils/encryption.js
import crypto from "crypto";

const algorithm = "ADD YOUR ALGORITHM HERE !!";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "utf8");
const iv = Buffer.from(process.env.IV, "utf8");

export function encrypt(text) {
  if (!text) return "";
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encryptedText) {
  if (!encryptedText) return "";
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    console.warn(" Failed to decrypt value:", encryptedText);
    return "[Decryption Failed]";
  }
}
