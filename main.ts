import { mkdirSync, writeFileSync, readFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The kitchen light is still on. Someone left it on for you. The kettle has gone quiet, the day has folded itself away. Outside, the street is empty. Nothing is waiting, nothing is owed. The house keeps its watch, and you are carried, the way a harbour carries a boat.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 280) {
  console.error(`entry must be 1-280 code points, got ${codePoints}`);
  process.exit(1);
}
if (TEXT.trim().length === 0) {
  console.error("entry must not be only whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, { encoding: "utf8" });
chmodSync(outPath, 0o644);

const back = readFileSync(outPath, "utf8");
if (back !== TEXT) {
  console.error("verification failed: entry.txt does not match the text");
  process.exit(1);
}
console.log(`wrote ${outPath} (${codePoints} code points)`);
