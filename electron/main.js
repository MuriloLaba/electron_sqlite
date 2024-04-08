const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const KartModel = require('./models/KartModel');
const db = require('./database/db.js');
const IpcHandler = require('./ipcHandler.js');

const kartModel = new KartModel(db);

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, 
      nodeIntegration: false,
    }
  });

  win.loadURL('http://localhost:3000');
  win.maximize()
}

app.on('ready', () => {
  createWindow();
  const ipcHandler = new IpcHandler(kartModel);
  ipcHandler.registerIpcEvents(ipcMain);
});