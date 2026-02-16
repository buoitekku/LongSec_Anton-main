import fs from "fs";
import path from "path";

const rootDir = path.resolve(import.meta.dirname, "..");
const cmsDist = path.join(rootDir, "cms", "dist");
const targetDir = path.join(rootDir, "dist", "public", "studio");

if (!fs.existsSync(cmsDist)) {
  console.error("CMS build output not found:", cmsDist);
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(cmsDist, targetDir, { recursive: true });

console.log("Copied CMS build to:", targetDir);
