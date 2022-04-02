const fs = require("fs");
const path = require("path");

// Copy package.json to the dist folder
fs.copyFileSync(
  path.resolve(__dirname, "../package.json"),
  path.resolve(__dirname, "../dist/package.json")
);

// Copy README to the dist folder
fs.copyFileSync(
  path.resolve(__dirname, "../README.md"),
  path.resolve(__dirname, "../dist/README.md")
);
