// store.js
const Store = require('electron-store')
class MyStore {
  constructor() {
    this.store = new Store({
      defaults: {
        homepage: 'https://www.google.com',
        bookmarks: [],
        history: [],
        settings: {}
      }
    })
  }
  get(key) { return this.store.get(key) }
  set(key, val) { return this.store.set(key, val) }
  getAll() { return this.store.store }

  addBookmark(b) {
    const list = this.store.get('bookmarks') || []
    if (!list.find(x => x.url === b.url)) {
      list.unshift(b)
      this.store.set('bookmarks', list)
    }
  }
  removeBookmark(url) {
    const list = (this.store.get('bookmarks') || []).filter(x => x.url !== url)
    this.store.set('bookmarks', list)
  }

  pushHistory(url) {
    const h = this.store.get('history') || []
    const item = { url, ts: Date.now() }
    h.unshift(item)
    // keep last 1000 entries
    this.store.set('history', h.slice(0, 1000))
  }
  clearHistory() { this.store.set('history', []) }
}
module.exports = MyStore
