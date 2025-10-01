document.getElementById("browserView").addEventListener("did-navigate", async (e) => {
  const store = await window.electronAPI.getStore();
  store.history.push(e.url);
  await window.electronAPI.saveStore(store);
});
