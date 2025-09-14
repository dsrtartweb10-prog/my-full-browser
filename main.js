// main.js
const { app, BrowserWindow, BrowserView, ipcMain, session } = require('electron')
const path = require('path')
const Store = require('./store')
const DownloadManager = require('./downloadManager')
const Updater = require('./updater')

let mainWindow
let tabs = []
let activeIndex = 0
const store = new Store()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280, height: 820,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, contextIsolation: true
    },
    icon: path.join(__dirname, 'assets', 'icon.png')
  })

  mainWindow.loadFile('ui/index.html')

  // init DownloadManager & Updater
  DownloadManager.init(app, session.defaultSession, mainWindow, store)
  Updater.init(mainWindow) // configure auto-update checks

  // buat tab awal
  createTab(store.get('homepage') || 'https://www.google.com')
}

function createTab(url) {
  const view = new BrowserView({
    webPreferences: {
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  view.webContents.loadURL(url)
  const id = Date.now()
  tabs.push({ id, view, url })
  setActiveTab(tabs.length - 1)
  sendTabsUpdate()
}

function setActiveTab(index) {
  if (!tabs[index]) return
  activeIndex = index
  mainWindow.setBrowserView(tabs[index].view)
  const bounds = { x: 0, y: 120, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 120 }
  tabs[index].view.setBounds(bounds)
  tabs[index].view.setAutoResize({ width: true, height: true })

  // update url stored and title events
  tabs[index].view.webContents.on('did-navigate', (e, url) => {
    tabs[index].url = url
    store.pushHistory(url)
    sendTabsUpdate()
  })
  tabs[index].view.webContents.on('page-title-updated', () => sendTabsUpdate())
}

function closeTab(index) {
  if (!tabs[index]) return
  tabs[index].view.destroy()
  tabs.splice(index,1)
  if (tabs.length === 0) createTab(store.get('homepage') || 'https://www.google.com')
  else setActiveTab(Math.max(0, index - 1))
  sendTabsUpdate()
}

function sendTabsUpdate() {
  const data = tabs.map((t,i) => ({ index: i, url: t.url, title: (t.view.webContents.getTitle() || t.url), active: i === activeIndex }))
  mainWindow.webContents.send('tabs-updated', data)
}

// IPC
ipcMain.on('navigate', (e, url) => {
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url
  tabs[activeIndex].view.webContents.loadURL(url)
})
ipcMain.on('new-tab', () => createTab(store.get('homepage') || 'https://www.google.com') )
ipcMain.on('switch-tab', (e, idx) => setActiveTab(idx))
ipcMain.on('close-tab', (e, idx) => closeTab(idx))
ipcMain.on('bookmark-add', (e, title, url) => store.addBookmark({ title, url }))
ipcMain.on('bookmark-remove', (e, url) => store.removeBookmark(url))
ipcMain.on('get-bookmarks', (e) => e.returnValue = store.get('bookmarks'))
ipcMain.on('get-history', (e) => e.returnValue = store.get('history'))
ipcMain.on('clear-history', () => store.clearHistory())
ipcMain.on('get-settings', (e) => e.returnValue = store.getAll())
ipcMain.on('set-setting', (e, key, val) => store.set(key, val))

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
