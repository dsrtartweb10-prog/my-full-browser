const fs = require("fs");
const path = require("path");
const { loadData, saveData } = require("../../src/main/store");

const testFile = path.join(__dirname, "../../user-data.json");

describe("Store Module", () => {
  beforeEach(() => {
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
  });

  test("loadData returns default when no file", () => {
    const data = loadData();
    expect(data).toEqual({ bookmarks: [], history: [] });
  });

  test("saveData writes and loadData reads back", () => {
    const mockData = { bookmarks: ["https://example.com"], history: [] };
    saveData(mockData);

    const loaded = loadData();
    expect(loaded.bookmarks).toContain("https://example.com");
  });
});
