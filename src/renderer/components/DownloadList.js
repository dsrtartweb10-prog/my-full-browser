export function renderDownloadList(container, downloads) {
  container.innerHTML = "";
  downloads.forEach((d) => {
    const div = document.createElement("div");
    div.innerText = `File: ${d.filePath} [${d.state}]`;
    container.appendChild(div);
  });
}
