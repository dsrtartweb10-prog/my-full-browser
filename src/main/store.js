const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../../user-data.json");

function loadData() {
  try {
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    }
    return { bookmarks: [], history: [] };
  } catch (err) {
    console.error("Failed to load store:", err);
    return { bookmarks: [], history: [] };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to save store:", err);
  }
}

module.exports = { loadData, saveData };
