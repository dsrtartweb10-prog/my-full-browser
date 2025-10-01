const { app } = require("electron");
const { createMainWindow } = require("./windowManager");
const { initDownloadManager } = require("./downloadManager");
const { registerIPCHandlers } = require("./ipcHandlers");
const { setupMenu } = require("./appMenu");

let mainWindow;

function createApp() {
  mainWindow = createMainWindow();

  // Init modules
  initDownloadManager(mainWindow);
  registerIPCHandlers(mainWindow);
  setupMenu(mainWindow);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createApp);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createApp();
});
