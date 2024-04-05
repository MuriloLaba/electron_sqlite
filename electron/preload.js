const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    send: (channel, data) => {
      let validChannels = ['toMain', 'createKart']; // Adicione todos os canais válidos aqui
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = ['fromMain', 'createKartResponse']; // Adicione todos os canais válidos de resposta aqui
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    clear: (channel) => {
      // Novo método para remover todos os ouvintes de um canal
      ipcRenderer.removeAllListeners(channel);
    }
  }
);
