// downloadManager.js
const { dialog } = require('electron')
module.exports = {
  init: (app, session, mainWindow, store) => {
    session.on('will-download', (event, item, webContents) => {
      const filename = item.getFilename()
      const savePath = dialog.showSaveDialogSync(mainWindow, { defaultPath: filename })
      if (!savePath) { item.cancel(); return }
      item.setSavePath(savePath)
      item.on('updated', (e, state) => {
        // optionally send progress
      })
      item.once('done', (e, state) => {
        if (state === 'completed') {
          // could save to downloads db
        }
      })
    })
  }
}
