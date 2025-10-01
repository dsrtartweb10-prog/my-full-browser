let tabs = [];
let currentTab = 0;

function createTab(url = "https://example.com") {
  tabs.push(url);
  currentTab = tabs.length - 1;
  document.getElementById("browserView").src = url;
}

function switchTab(index) {
  if (tabs[index]) {
    currentTab = index;
    document.getElementById("browserView").src = tabs[index];
  }
}

function closeTab(index) {
  if (tabs[index]) {
    tabs.splice(index, 1);
    if (tabs.length > 0) {
      switchTab(0);
    } else {
      document.getElementById("browserView").src = "about:blank";
    }
  }
}
