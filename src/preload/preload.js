const { contextBridge, ipcRenderer } = require("electron");

// Expose API ke renderer (hanya yang aman)
contextBridge.exposeInMainWorld("electronAPI", {
  // Download events
  onDownloadProgress: (callback) =>
    ipcRenderer.on("download-progress", (event, data) => callback(data)),

  onDownloadComplete: (callback) =>
    ipcRenderer.on("download-complete", (event, data) => callback(data)),

  // Store (bookmark, history)
  getStore: () => ipcRenderer.invoke("get-store"),
  saveStore: (data) => ipcRenderer.invoke("save-store", data),

  // Logger
  log: (msg) => ipcRenderer.send("log-message", msg),
});
