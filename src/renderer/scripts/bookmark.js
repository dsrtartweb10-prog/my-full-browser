async function addBookmark() {
  const url = document.getElementById("browserView").src;
  const store = await window.electronAPI.getStore();
  store.bookmarks.push(url);
  await window.electronAPI.saveStore(store);
  alert("Bookmark added!");
}
