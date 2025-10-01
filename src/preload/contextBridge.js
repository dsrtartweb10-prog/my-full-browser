const { contextBridge } = require("electron");

function exposeAPI(name, apiObject) {
  contextBridge.exposeInMainWorld(name, apiObject);
}

module.exports = { exposeAPI };
