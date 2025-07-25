// find-react-issues.js
const fs = require("fs");
const path = require("path");

const SEARCH_TERMS = ["import { use } from 'react'", 'React5'];

/**
 * Recursively scan directories for matching terms.
 */
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip big node_modules subdirectories like .cache
      if (file === ".git" || file === ".cache") continue;
      scanDir(fullPath);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      const content = fs.readFileSync(fullPath, "utf8");
      for (const term of SEARCH_TERMS) {
        if (content.includes(term)) {
          console.log(`⚠️  Found "${term}" in ${fullPath}`);
        }
      }
    }
  }
}

console.log("🔍 Scanning project for invalid React imports and 'React5'...");
scanDir(path.resolve(__dirname, "src"));
scanDir(path.resolve(__dirname, "node_modules"));
console.log("✅ Scan complete.");
