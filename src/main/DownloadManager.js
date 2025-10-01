const { session, app } = require("electron");
const fs = require("fs");
const path = require("path");

function initDownloadManager(win) {
  session.defaultSession.on("will-download", (event, item) => {
    const savePath = path.join(app.getPath("downloads"), item.getFilename());

    if (!fs.existsSync(app.getPath("downloads"))) {
      fs.mkdirSync(app.getPath("downloads"), { recursive: true });
    }

    item.setSavePath(savePath);

    item.on("updated", (event, state) => {
      if (state === "progressing") {
        win.webContents.send("download-progress", item.getReceivedBytes());
      }
    });

    item.on("done", (event, state) => {
      win.webContents.send("download-complete", { state, savePath });
    });
  });
}

module.exports = { initDownloadManager };
