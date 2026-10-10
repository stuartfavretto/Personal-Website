import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";

const siteRoot = resolve("_site");
const htmlFiles = [];
const failures = [];

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) visit(path);
    else if (extname(path) === ".html") htmlFiles.push(path);
  }
}

function targetFor(reference, sourceFile) {
  const path = reference.split(/[?#]/, 1)[0];
  if (!path) return null;

  const decoded = decodeURIComponent(path);
  const absolute = decoded.startsWith("/")
    ? join(siteRoot, decoded)
    : resolve(dirname(sourceFile), decoded);

  if (extname(absolute)) return normalize(absolute);
  return join(normalize(absolute), "index.html");
}

visit(siteRoot);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const references = html.matchAll(/(?:href|src)=["']([^"']+)["']/g);

  for (const [, reference] of references) {
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(reference)) continue;
    const target = targetFor(reference, file);
    if (target && !existsSync(target)) {
      failures.push(`${file.replace(`${siteRoot}/`, "")}: ${reference}`);
    }
  }
}

if (failures.length) {
  console.error("Broken internal links:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files; no broken internal links found.`);
}
