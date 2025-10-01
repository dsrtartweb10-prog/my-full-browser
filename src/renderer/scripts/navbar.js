function updateNavbar(url) {
  document.getElementById("url").value = url;
}

// Sync with webview
document.getElementById("browserView").addEventListener("did-navigate", (e) => {
  updateNavbar(e.url);
});
