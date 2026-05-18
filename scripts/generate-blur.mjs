// scripts/generate-blur.mjs
import sharp from "sharp";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

const input = process.argv[2];

if (!input) {
  console.error("Usage: node scripts/generate-blur.mjs <url-or-path>");
  process.exit(1);
}

async function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
  });
}

const isUrl = input.startsWith("http://") || input.startsWith("https://");
const buffer = isUrl
  ? await fetchBuffer(input)
  : fs.readFileSync(path.resolve(input));

const blurred = await sharp(buffer).resize(10).toBuffer();
console.log(`data:image/jpeg;base64,${blurred.toString("base64")}`);
