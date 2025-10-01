const { ipcMain } = require("electron");
const { loadData, saveData } = require("./store");

function registerIPCHandlers(win) {
  ipcMain.handle("get-store", () => loadData());

  ipcMain.handle("save-store", (event, data) => {
    saveData(data);
    return true;
  });

  ipcMain.on("log-message", (event, msg) => {
    console.log("[Renderer]:", msg);
  });
}

module.exports = { registerIPCHandlers };
