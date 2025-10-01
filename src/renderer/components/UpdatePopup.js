export function showUpdatePopup(info) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "10px";
  div.style.right = "10px";
  div.style.background = "#fff";
  div.style.border = "1px solid #ccc";
  div.style.padding = "10px";
  div.innerHTML = `
    <strong>Update Available!</strong><br>
    Version: ${info.version}<br>
    <button id="updateNow">Update Now</button>
  `;
  document.body.appendChild(div);

  document.getElementById("updateNow").onclick = () => {
    alert("Downloading update...");
  };
}
