// renderer.js
const tabsEl = document.getElementById('tabs')
const urlInput = document.getElementById('url')
const btnGo = document.getElementById('go')
const btnNew = document.getElementById('btnNew')
const btnBookmark = document.getElementById('btnBookmark')
const btnHistory = document.getElementById('btnHistory')
const btnBookmarksList = document.getElementById('btnBookmarksList')
const messages = document.getElementById('messages')

btnGo.onclick = () => window.electronAPI.navigate(urlInput.value)
btnNew.onclick = () => window.electronAPI.newTab()

btnBookmark.onclick = () => {
  const title = prompt('Nama bookmark:', urlInput.value)
  if (title !== null) window.electronAPI.addBookmark(title, urlInput.value)
}

btnBookmarksList.onclick = () => {
  const b = window.electronAPI.getBookmarks() || []
  openPopup('Bookmarks', b.map(x => `<div><a href="#" data-url="${x.url}">${x.title}</a></div>`).join(''))
  // delegate clicks
  document.querySelectorAll('#popup a').forEach(a => a.onclick = e => { e.preventDefault(); window.electronAPI.navigate(a.dataset.url); closePopup() })
}

btnHistory.onclick = () => {
  const h = window.electronAPI.getHistory() || []
  openPopup('History (recent)', h.slice(0,50).map(x => `<div><a href="#" data-url="${x.url}">${x.url}</a></div>`).join(''))
  document.querySelectorAll('#popup a').forEach(a => a.onclick = e => { e.preventDefault(); window.electronAPI.navigate(a.dataset.url); closePopup() })
}

function openPopup(title, html) {
  const div = document.createElement('div')
  div.id = 'popup'
  div.innerHTML = `<div class="pophead">${title} <button id="closePop">Close</button></div><div class="popbody">${html}</div>`
  messages.appendChild(div)
  document.getElementById('closePop').onclick = closePopup
}
function closePopup() { const p = document.getElementById('popup'); if (p) p.remove() }

window.electronAPI.onTabsUpdated((tabs)=>{
  tabsEl.innerHTML = ''
  tabs.forEach(t => {
    const el = document.createElement('div')
    el.className = 'tab' + (t.active ? ' active' : '')
    el.textContent = t.title || t.url
    el.onclick = () => window.electronAPI.switchTab(t.index)
    tabsEl.appendChild(el)
    if (t.active) urlInput.value = t.url
  })
})

// Update notifications from updater
window.addEventListener('DOMContentLoaded', () => {
  const ipc = window.electronAPI
  // receive update events
  window.electronAPI.onUpdateAvailable = (info) => {
    openPopup('Update available', `<div>Version ${info.version} available. <button id="dlUpdate">Download</button></div>`)
    document.getElementById('dlUpdate').onclick = () => {
      // trigger autoUpdater.downloadUpdate via ipc (not yet wired); simple path: inform user to update
      closePopup()
      alert('Will download update (not implemented in this skeleton).')
    }
  }
})
