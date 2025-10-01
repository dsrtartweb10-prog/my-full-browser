const { ipcMain } = require("electron");
const { contextBridge, ipcRenderer } = require("electron");
const { loadData, saveData } = require("../../src/main/store");

// Mock preload (seperti di preload.js)
beforeAll(() => {
  contextBridge.exposeInMainWorld = jest.fn((name, api) => {
    global[name] = api;
  });

  // Simulasi preload API
  contextBridge.exposeInMainWorld("electronAPI", {
    getStore: () => ipcRenderer.invoke("get-store"),
    saveStore: (data) => ipcRenderer.invoke("save-store", data),
  });

  // Mock IPC main handler
  ipcMain.handle("get-store", () => loadData());
  ipcMain.handle("save-store", (event, data) => {
    saveData(data);
    return true;
  });
});

describe("IPC Integration", () => {
  test("renderer can call getStore and receive data", async () => {
    const result = await global.electronAPI.getStore();
    expect(result).toHaveProperty("bookmarks");
    expect(result).toHaveProperty("history");
  });

  test("renderer can saveStore and get updated data", async () => {
    const mockData = { bookmarks: ["https://ipc-test.com"], history: [] };
    await global.electronAPI.saveStore(mockData);

    const result = await global.electronAPI.getStore();
    expect(result.bookmarks).toContain("https://ipc-test.com");
  });
});
