import { fileURLToPath } from "url";
import { dirname } from "path";
import { readdir, unlink } from "node:fs/promises";
import { execFileSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  await unlink("./employees.db");
  const files = await readdir(__dirname);
  const sorted = files.filter((f) => f !== "runMigrations.js").sort();
  for (const file of sorted) {
    const fullPath = `${__dirname}/${file}`;
    console.log(`running this migration: ${fullPath}`);
    execFileSync("node", [fullPath]);
  }
} catch (err) {
  console.error(err);
}
