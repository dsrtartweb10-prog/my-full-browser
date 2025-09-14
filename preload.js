// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  navigate: (url) => ipcRenderer.send('navigate', url),
  newTab: () => ipcRenderer.send('new-tab'),
  switchTab: (idx) => ipcRenderer.send('switch-tab', idx),
  closeTab: (idx) => ipcRenderer.send('close-tab', idx),
  addBookmark: (title, url) => ipcRenderer.send('bookmark-add', title, url),
  removeBookmark: (url) => ipcRenderer.send('bookmark-remove', url),
  getBookmarks: () => ipcRenderer.sendSync('get-bookmarks'),
  getHistory: () => ipcRenderer.sendSync('get-history'),
  clearHistory: () => ipcRenderer.send('clear-history'),
  onTabsUpdated: (fn) => ipcRenderer.on('tabs-updated', (e, tabs) => fn(tabs)),
  getSettings: () => ipcRenderer.sendSync('get-settings'),
  setSetting: (k,v) => ipcRenderer.send('set-setting', k, v)
})
