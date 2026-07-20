const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PACKAGES = path.join(DIST, "packages");
const VERSION = "1.1.0";

const platforms = [
  {
    name: "chrome",
    manifest: "manifests/manifest.chrome.json",
    zip: `flag-game-chrome-${VERSION}.zip`
  },
  {
    name: "edge",
    manifest: "manifests/manifest.edge.json",
    zip: `flag-game-edge-${VERSION}.zip`
  },
  {
    name: "firefox",
    manifest: "manifests/manifest.firefox.json",
    zip: `flag-game-firefox-${VERSION}.zip`
  }
];

const runtimeDirectories = [
  "assets",
  "css",
  "game",
  "js",
  "locales"
];

const forbiddenNames = new Set([
  ".git",
  ".github",
  ".agents",
  ".codex",
  "node_modules",
  "dist",
  "docs",
  "divulgação",
  "homepage",
  "manifests",
  "scripts"
]);

const forbiddenFilePatterns = [
  /\.zip$/i,
  /\.log$/i,
  /\.bak$/i,
  /\.tmp$/i,
  /^\.env$/i,
  /^\.dev\.vars$/i,
  /^manifest\..+\.json$/i
];

const excludedRuntimeFiles = new Set([
  "assets/images/pix-qrcode.png",
  "assets/pix-qrcode.png"
]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(source, destination) {
  const relativeSource = path.relative(ROOT, source).replace(/\\/g, "/");

  if (excludedRuntimeFiles.has(relativeSource)) {
    return;
  }

  const stats = fs.statSync(source);

  if (stats.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });

    for (const entry of fs.readdirSync(source)) {
      if (forbiddenNames.has(entry)) {
        continue;
      }

      copyRecursive(
        path.join(source, entry),
        path.join(destination, entry)
      );
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

function toZipEntryName(sourceDir, file) {
  const relative = path.relative(sourceDir, file);
  const entryName = relative.replace(/\\/g, "/");

  assert(relative && !path.isAbsolute(relative), `invalid ZIP entry path ${file}`);
  assert(!entryName.startsWith("../") && entryName !== "..", `invalid ZIP entry path ${entryName}`);
  assert(!entryName.includes("\\"), `ZIP entry contains Windows separator ${entryName}`);

  return entryName;
}

function validateManifest(targetDir, platform) {
  const manifestPath = path.join(targetDir, "manifest.json");
  assert(fs.existsSync(manifestPath), `${platform}: manifest.json missing`);

  const manifest = readJson(manifestPath);

  assert(
    manifest.manifest_version === 3,
    `${platform}: manifest_version must be 3`
  );
  assert(manifest.version === VERSION, `${platform}: version mismatch`);
  assert(manifest.name, `${platform}: name missing`);
  assert(manifest.description, `${platform}: description missing`);
  assert(
    manifest.description.length <= 132,
    `${platform}: description exceeds Chrome Web Store limit`
  );
  assert(
    !manifest.default_locale,
    `${platform}: default_locale must be absent without _locales`
  );
  assert(
    !manifest.permissions || Array.isArray(manifest.permissions),
    `${platform}: permissions must be an array when present`
  );
  assert(
    !manifest.host_permissions || Array.isArray(manifest.host_permissions),
    `${platform}: host_permissions must be an array when present`
  );

  const iconMaps = [
    manifest.icons || {},
    (manifest.action && manifest.action.default_icon) || {}
  ];

  for (const icons of iconMaps) {
    for (const [size, iconPath] of Object.entries(icons)) {
      assert(/^\d+$/.test(size), `${platform}: invalid icon size ${size}`);
      assert(
        fs.existsSync(path.join(targetDir, iconPath)),
        `${platform}: missing icon ${iconPath}`
      );
    }
  }

  assert(manifest.background, `${platform}: background missing`);

  if (manifest.background.service_worker) {
    assert(
      fs.existsSync(path.join(targetDir, manifest.background.service_worker)),
      `${platform}: missing service worker`
    );
  }

  if (manifest.background.scripts) {
    for (const script of manifest.background.scripts) {
      assert(
        fs.existsSync(path.join(targetDir, script)),
        `${platform}: missing background script ${script}`
      );
    }
  }

  if (platform === "firefox") {
    const gecko =
      manifest.browser_specific_settings &&
      manifest.browser_specific_settings.gecko;

    assert(gecko, "firefox: browser_specific_settings.gecko missing");
    assert(
      gecko.id === "flaggame@flaggame.app",
      "firefox: unexpected Gecko ID"
    );
    assert(
      gecko.data_collection_permissions &&
      Array.isArray(gecko.data_collection_permissions.required) &&
      gecko.data_collection_permissions.required.includes("none"),
      "firefox: data_collection_permissions.required must include none"
    );
  } else {
    assert(
      !manifest.browser_specific_settings,
      `${platform}: browser_specific_settings should not be present`
    );
  }

  const manifestText = fs.readFileSync(manifestPath, "utf8");
  assert(
    !/file:\/\/|localhost|127\.0\.0\.1/.test(manifestText),
    `${platform}: local URL found in manifest`
  );
}

function validateHtmlReferences(targetDir, platform) {
  const htmlPath = path.join(targetDir, "game", "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const references = [];
  const attributePattern =
    /\b(?:src|href)=["']([^"']+)["']/g;
  let match;

  while ((match = attributePattern.exec(html))) {
    const value = match[1];

    if (
      !value ||
      value.startsWith("#") ||
      value.startsWith("mailto:") ||
      /^https?:\/\//.test(value)
    ) {
      continue;
    }

    references.push(value);
  }

  for (const reference of references) {
    assert(
      fs.existsSync(path.join(targetDir, reference)),
      `${platform}: missing HTML reference ${reference}`
    );
  }
}

function validateFlags(targetDir, platform) {
  const countriesSource = fs.readFileSync(
    path.join(targetDir, "js", "countries.js"),
    "utf8"
  );
  const flagFiles = [
    ...countriesSource.matchAll(/flagFile:\s*"([^"]+)"/g)
  ].map(match => match[1]);

  assert(flagFiles.length > 0, `${platform}: no flag references found`);

  for (const flagFile of flagFiles) {
    assert(
      fs.existsSync(path.join(targetDir, "assets", "flags", flagFile)),
      `${platform}: missing flag ${flagFile}`
    );
  }
}

function validateLocales(targetDir, platform) {
  const localeDir = path.join(targetDir, "locales");
  const localeFiles = fs
    .readdirSync(localeDir)
    .filter(file => file.endsWith(".json"))
    .sort();

  assert(localeFiles.length === 20, `${platform}: expected 20 locales`);

  const counts = new Set();

  for (const file of localeFiles) {
    counts.add(Object.keys(readJson(path.join(localeDir, file))).length);
  }

  assert(counts.size === 1, `${platform}: locale key counts differ`);

  const localeData = fs.readFileSync(
    path.join(targetDir, "js", "locales-data.js"),
    "utf8"
  );

  for (const file of localeFiles) {
    const language = file.replace(/\.json$/, "");
    assert(
      localeData.includes(`"${language}":`),
      `${platform}: embedded locale missing ${language}`
    );
  }
}

function validateNoForbiddenFiles(targetDir, platform) {
  for (const file of listFiles(targetDir)) {
    const relative = path.relative(targetDir, file).replace(/\\/g, "/");
    const basename = path.basename(file);

    assert(
      !relative.split("/").some(part => forbiddenNames.has(part)),
      `${platform}: forbidden directory in package ${relative}`
    );

    assert(
      !forbiddenFilePatterns.some(pattern => pattern.test(basename)),
      `${platform}: forbidden file in package ${relative}`
    );
  }

  const manifests = listFiles(targetDir)
    .map(file => path.relative(targetDir, file).replace(/\\/g, "/"))
    .filter(file => /(^|\/)manifest.*\.json$/i.test(file));

  assert(
    manifests.length === 1 && manifests[0] === "manifest.json",
    `${platform}: package must contain only root manifest.json`
  );
}

function validateJavaScript(targetDir) {
  const jsFiles = listFiles(targetDir)
    .filter(file => file.endsWith(".js"));

  for (const file of jsFiles) {
    const result = require("child_process").spawnSync(process.execPath, ["--check", file], {
      cwd: ROOT,
      encoding: "utf8"
    });

    if (result.status !== 0) {
      throw new Error(
        [
          `${process.execPath} --check ${file} failed`,
          result.stdout,
          result.stderr
        ].filter(Boolean).join("\n")
      );
    }
  }
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function writeUInt16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value);
  return buffer;
}

function writeUInt32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value);
  return buffer;
}

function writeZipString(value) {
  return Buffer.from(value, "utf8");
}

const ZIP_DOS_TIME = 0;
const ZIP_DOS_DATE = (1 << 5) | 1;

function createStoredZip(entries, zipPath) {
  const chunks = [];
  const centralDirectory = [];
  let offset = 0;

  for (const entry of entries) {
    const name = writeZipString(entry.name);
    const data = fs.readFileSync(entry.file);
    const checksum = crc32(data);

    assert(data.length <= 0xffffffff, `file too large for ZIP ${entry.name}`);
    assert(offset <= 0xffffffff, `ZIP too large before ${entry.name}`);

    const localHeader = Buffer.concat([
      writeUInt32(0x04034b50),
      writeUInt16(20),
      writeUInt16(0x0800),
      writeUInt16(0),
      writeUInt16(ZIP_DOS_TIME),
      writeUInt16(ZIP_DOS_DATE),
      writeUInt32(checksum),
      writeUInt32(data.length),
      writeUInt32(data.length),
      writeUInt16(name.length),
      writeUInt16(0),
      name
    ]);

    chunks.push(localHeader, data);

    centralDirectory.push(Buffer.concat([
      writeUInt32(0x02014b50),
      writeUInt16(20),
      writeUInt16(20),
      writeUInt16(0x0800),
      writeUInt16(0),
      writeUInt16(ZIP_DOS_TIME),
      writeUInt16(ZIP_DOS_DATE),
      writeUInt32(checksum),
      writeUInt32(data.length),
      writeUInt32(data.length),
      writeUInt16(name.length),
      writeUInt16(0),
      writeUInt16(0),
      writeUInt16(0),
      writeUInt16(0),
      writeUInt32(0),
      writeUInt32(offset),
      name
    ]));

    offset += localHeader.length + data.length;
  }

  const centralDirectoryOffset = offset;
  const centralDirectoryBuffer = Buffer.concat(centralDirectory);
  offset += centralDirectoryBuffer.length;

  assert(entries.length <= 0xffff, "too many files for ZIP");
  assert(centralDirectoryBuffer.length <= 0xffffffff, "ZIP central directory too large");
  assert(centralDirectoryOffset <= 0xffffffff, "ZIP central directory starts past ZIP32 limit");

  const endOfCentralDirectory = Buffer.concat([
    writeUInt32(0x06054b50),
    writeUInt16(0),
    writeUInt16(0),
    writeUInt16(entries.length),
    writeUInt16(entries.length),
    writeUInt32(centralDirectoryBuffer.length),
    writeUInt32(centralDirectoryOffset),
    writeUInt16(0)
  ]);

  fs.writeFileSync(zipPath, Buffer.concat([
    ...chunks,
    centralDirectoryBuffer,
    endOfCentralDirectory
  ]));
}

function readZipEntries(zipPath) {
  const zip = fs.readFileSync(zipPath);
  const eocdSignature = 0x06054b50;
  let eocdOffset = -1;

  for (let index = zip.length - 22; index >= 0; index -= 1) {
    if (zip.readUInt32LE(index) === eocdSignature) {
      eocdOffset = index;
      break;
    }
  }

  assert(eocdOffset >= 0, `ZIP end of central directory not found in ${zipPath}`);

  const entryCount = zip.readUInt16LE(eocdOffset + 10);
  const centralDirectoryOffset = zip.readUInt32LE(eocdOffset + 16);
  const entries = [];
  let offset = centralDirectoryOffset;

  for (let index = 0; index < entryCount; index += 1) {
    assert(zip.readUInt32LE(offset) === 0x02014b50, `invalid ZIP central directory in ${zipPath}`);

    const nameLength = zip.readUInt16LE(offset + 28);
    const extraLength = zip.readUInt16LE(offset + 30);
    const commentLength = zip.readUInt16LE(offset + 32);
    const nameStart = offset + 46;
    const nameEnd = nameStart + nameLength;

    entries.push(zip.toString("utf8", nameStart, nameEnd));
    offset = nameEnd + extraLength + commentLength;
  }

  return entries;
}

function validateZip(zipPath, platform) {
  const entries = readZipEntries(zipPath);

  assert(entries.includes("manifest.json"), `${platform}: ZIP missing root manifest.json`);
  assert(
    !entries.some(entry => /^[^/]+\/manifest\.json$/.test(entry)),
    `${platform}: ZIP contains an extra outer folder`
  );
  assert(
    !entries.some(entry => entry.includes("\\")),
    `${platform}: ZIP contains Windows path separators`
  );
}

function zipDirectory(sourceDir, zipPath) {
  fs.rmSync(zipPath, { force: true });

  const entries = listFiles(sourceDir)
    .map(file => ({
      file,
      name: toZipEntryName(sourceDir, file)
    }))
    .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

  createStoredZip(entries, zipPath);
}

function validatePackage(targetDir, platform) {
  validateManifest(targetDir, platform);
  validateHtmlReferences(targetDir, platform);
  validateFlags(targetDir, platform);
  validateLocales(targetDir, platform);
  validateNoForbiddenFiles(targetDir, platform);
  validateJavaScript(targetDir);
}

function buildPlatform(platform) {
  const targetDir = path.join(DIST, platform.name);

  fs.mkdirSync(targetDir, { recursive: true });

  for (const directory of runtimeDirectories) {
    copyRecursive(
      path.join(ROOT, directory),
      path.join(targetDir, directory)
    );
  }

  fs.copyFileSync(
    path.join(ROOT, platform.manifest),
    path.join(targetDir, "manifest.json")
  );

  validatePackage(targetDir, platform.name);

  const zipPath = path.join(PACKAGES, platform.zip);
  zipDirectory(targetDir, zipPath);
  validateZip(zipPath, platform.name);

  return { targetDir, zipPath };
}

function main() {
  ensureCleanDir(DIST);
  fs.mkdirSync(PACKAGES, { recursive: true });

  const results = platforms.map(buildPlatform);

  console.log(`Built Flag Game ${VERSION}`);
  for (const result of results) {
    console.log(path.relative(ROOT, result.targetDir));
    console.log(path.relative(ROOT, result.zipPath));
  }
}

main();
