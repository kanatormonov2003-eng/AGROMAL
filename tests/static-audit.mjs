import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const required = ["index.html", "dashboard.html", "admin.html", "404.html", "sitemap.xml", "robots.txt", "_headers", ".env.example", "supabase/schema.sql", "supabase/policies.sql", "supabase/seed.sql"];
const failures = [];
for (const path of required) if (!existsSync(join(root, path))) failures.push(`Missing required file: ${path}`);

const files = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)]);
const htmlFiles = files(root).filter((path) => extname(path) === ".html");
for (const path of htmlFiles) {
  const source = readFileSync(path, "utf8");
  const ids = [...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) failures.push(`${path}: duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
  for (const match of source.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|#|data:|mailto:|tel:)/.test(target)) continue;
    const clean = target.split(/[?#]/)[0];
    const resolved = clean.startsWith("/") ? resolve(root, `.${clean}`) : resolve(join(path, ".."), clean);
    if (!clean || !existsSync(resolved)) failures.push(`${path}: broken local reference ${target}`);
  }
}

const browserSources = files(join(root, "assets", "js")).filter((path) => extname(path) === ".js");
for (const path of browserSources) {
  const source = readFileSync(path, "utf8");
  if (/localStorage\.setItem\([^,]*(?:auth|session|logged)/i.test(source)) failures.push(`${path}: localStorage auth state detected`);
  if (/SUPABASE_SERVICE_ROLE_KEY\s*[:=]/.test(source)) failures.push(`${path}: service role key detected in frontend`);
  if (/\bdebugger\b|console\.log\s*\(/.test(source)) failures.push(`${path}: debug artifact detected`);
  const checked = spawnSync(process.execPath, ["--check", path], { encoding: "utf8" });
  if (checked.status !== 0) failures.push(`${path}: JavaScript syntax error\n${checked.stderr}`);
}

const policies = readFileSync(join(root, "supabase", "policies.sql"), "utf8");
for (const table of ["organizations", "profiles", "lots"]) if (!new RegExp(`alter table public\\.${table} enable row level security`, "i").test(policies)) failures.push(`RLS not enabled for ${table}`);

if (failures.length) {
  console.error(`Static audit failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Static audit passed: ${htmlFiles.length} HTML pages, ${browserSources.length} browser modules, required files and RLS declarations verified.`);
