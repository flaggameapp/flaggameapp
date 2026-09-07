const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "dist", "android");
const GAME_ENTRY = path.join(ROOT, "game", "index.html");
const REQUIRED_DIRS = ["assets/flags", "assets/images", "css", "js", "locales"];
const FORBIDDEN_TERMS = [
  /pix/i,
  /ko-fi/i,
  /doa[cç][aã]o/i,
  /donation/i,
  /google play billing/i,
  /purchase/i
];
const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".txt",
  ".xml"
]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(source, destination) {
  const stats = fs.statSync(source);

  if (stats.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });

    for (const entry of fs.readdirSync(source)) {
      copyDir(path.join(source, entry), path.join(destination, entry));
    }

    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function listFiles(dir) {
  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function writeAndroidEntry() {
  let html = fs.readFileSync(GAME_ENTRY, "utf8");

  html = html.replace(
    /<base\s+href=["']\.\.\/["']\s*>/i,
    '<base href="./">'
  );

  assert(
    /<base\s+href=["']\.\/["']\s*>/i.test(html),
    "Android index.html must use a local base href."
  );

  fs.writeFileSync(path.join(OUT_DIR, "index.html"), html);
}

function validateEntryPoint() {
  const indexPath = path.join(OUT_DIR, "index.html");

  assert(fs.existsSync(indexPath), "Android webDir is missing index.html.");
  assert(
    !fs.existsSync(path.join(OUT_DIR, "homepage")),
    "Android webDir must not contain homepage/."
  );
  assert(
    !fs.existsSync(path.join(OUT_DIR, "game", "index.html")),
    "Android webDir must not contain a second game entry."
  );
  assert(
    !fs.existsSync(path.join(OUT_DIR, "manifest.json")),
    "Android webDir must not contain the browser extension manifest."
  );
}

function validateLocales() {
  const localeDir = path.join(OUT_DIR, "locales");
  const localeFiles = fs.readdirSync(localeDir).filter(name => name.endsWith(".json"));

  assert(localeFiles.length === 20, `Expected 20 locale files, found ${localeFiles.length}.`);

  for (const file of localeFiles) {
    JSON.parse(fs.readFileSync(path.join(localeDir, file), "utf8"));
  }
}

function validateForbiddenContent() {
  const matches = [];

  for (const file of listFiles(OUT_DIR)) {
    const relative = path.relative(OUT_DIR, file).replace(/\\/g, "/");

    for (const term of FORBIDDEN_TERMS) {
      if (term.test(relative)) {
        matches.push(relative);
        break;
      }
    }

    if (!TEXT_EXTENSIONS.has(path.extname(file).toLowerCase())) {
      continue;
    }

    const content = fs.readFileSync(file, "utf8");

    for (const term of FORBIDDEN_TERMS) {
      if (term.test(content)) {
        matches.push(relative);
        break;
      }
    }
  }

  assert(
    matches.length === 0,
    `Forbidden Android package references found: ${matches.join(", ")}`
  );
}

function copySupabaseBundle() {
  const src = path.join(ROOT, "node_modules", "@supabase", "supabase-js", "dist", "umd", "supabase.js");
  const dest = path.join(OUT_DIR, "js", "libs", "supabase.js");

  if (!fs.existsSync(src)) {
    throw new Error(`Supabase UMD bundle not found at ${src}. Run 'npm install' first.`);
  }

  console.log(`Copying real Supabase bundle to ${dest}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  ensureCleanDir(OUT_DIR);
  writeAndroidEntry();

  for (const dir of REQUIRED_DIRS) {
    copyDir(path.join(ROOT, dir), path.join(OUT_DIR, dir));
  }

  copySupabaseBundle();

  validateEntryPoint();
  validateLocales();
  validateForbiddenContent();

  console.log("Built Flag Game Android web assets in dist/android");
}

main();
