// updater.js
const { autoUpdater } = require('electron-updater')

module.exports = {
  init: (mainWindow) => {
    // set feed url in package.json build.publish or programmatically
    autoUpdater.autoDownload = false // allow user to accept download

    autoUpdater.on('update-available', info => {
      mainWindow.webContents.send('update-available', info)
    })
    autoUpdater.on('update-downloaded', info => {
      mainWindow.webContents.send('update-downloaded', info)
    })
    autoUpdater.on('error', err => {
      mainWindow.webContents.send('update-error', (err && err.message) || 'Unknown')
    })

    // check at startup
    setTimeout(() => autoUpdater.checkForUpdates().catch(()=>{}), 10000)
  }
}
