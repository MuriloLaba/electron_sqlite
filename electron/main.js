const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const KartModel = require('./models/KartModel');
const db = require('./database/db.js');
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

app.on('ready', createWindow);

ipcMain.on('toMain', (event, data) => {
  console.log('backend: ', data);
  event.reply('fromMain', 'SE VOLTOU É GOD OTHIN!!!!! ');
});


ipcMain.on('alguma-acao-do-db', (event, data) => {
  // Use db para interagir com o SQLite
  db.all("SELECT * FROM sua_tabela", [], (err, rows) => {
    // ...
  });
});

ipcMain.on('createKart', (event, kart) => {
  kartModel.create(kart, (err, data) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados', err);
      event.reply('createKartResponse', { success: false, message: 'Falha ao inserir kart', error: err });
    } else {
      console.log('Kart inserido com sucesso', data);
      event.reply('createKartResponse', { success: true, kartId: data.id, message: 'Kart inserido com sucesso' });
    }
  });
});
