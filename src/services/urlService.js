import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

// Location of JSON storage
const filePath = path.join(_dirname, "../storage/urls.json");

// Shorten URL 

export function shortenUrl(originalUrl) {
  const shortCode = nanoid(6);
  const data = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  data[shortCode] = originalUrl;

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );

  return shortCode;
}
export function getOriginalUrl(shortCode) {
  const data = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );
  return data[shortCode] || null;
}