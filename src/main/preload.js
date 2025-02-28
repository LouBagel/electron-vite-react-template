// Quirk: preload.js must use commonJS syntax in this setup
const { contextBridge, ipcRenderer } = require('electron');
// console.log('preload');

contextBridge.exposeInMainWorld('preloader', {
  message: (data) => ipcRenderer.invoke('message', data)
})