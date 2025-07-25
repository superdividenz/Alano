const fs = require("fs");
const path = require("path");

const projectDir = path.resolve("./src"); // Scan only your src folder

function searchFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      searchFiles(fullPath);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes("import { use } from \"react\"")) {
        console.log(`⚠️ Found invalid import in: ${fullPath}`);
      }
    }
  });
}

console.log("🔍 Searching for invalid 'import { use } from \"react\"'...");
searchFiles(projectDir);
console.log("✅ Search complete.");
