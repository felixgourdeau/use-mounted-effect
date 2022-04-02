const fs = require("fs");
const path = require("path");

// Copy .npmignore to the dist folder
fs.copyFileSync(
  path.resolve(__dirname, "../.npmignore"),
  path.resolve(__dirname, "../dist/.npmignore")
);

// Copy README to the dist folder
fs.copyFileSync(
  path.resolve(__dirname, "../README.md"),
  path.resolve(__dirname, "../dist/README.md")
);
