const browserView = document.getElementById("browserView");
const urlInput = document.getElementById("url");

// Basic navigation
function navigate() {
  const inputUrl = urlInput.value.trim();
  browserView.src = inputUrl.startsWith("http")
    ? inputUrl
    : `https://${inputUrl}`;
}

function goBack() {
  browserView.goBack();
}

function goForward() {
  browserView.goForward();
}

function reload() {
  browserView.reload();
}

// Listen download events
window.electronAPI.onDownloadComplete((data) => {
  const downloads = document.getElementById("downloads");
  const div = document.createElement("div");
  div.innerText = `Download ${data.state}: ${data.savePath}`;
  downloads.appendChild(div);
});
