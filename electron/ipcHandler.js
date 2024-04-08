class IpcHandler {
  constructor(kartModel) {
    this.kartModel = kartModel;
  }

  registerIpcEvents(ipcMain) {
    ipcMain.on('toMain', this.toMain.bind(this));
    ipcMain.on('alguma-acao-do-db', this.algumaAcaoDoDb.bind(this));
    ipcMain.on('createKart', this.createKart.bind(this));
  }

  toMain(event, data) {
    console.log('backend: ', data);
    event.reply('fromMain', 'SE VOLTOU É GOD OTHIN!!!!! ');
  }

  algumaAcaoDoDb(event, data) {
    // Lógica de interação com o banco de dados
  }

  createKart(event, kart) {
    this.kartModel.create(kart, (err, data) => {
      if (err) {
        console.error('Erro ao inserir no banco de dados', err);
        event.reply('createKartResponse', { success: false, message: 'Falha ao inserir kart', error: err });
      } else {
        console.log('Kart inserido com sucesso', data);
        event.reply('createKartResponse', { success: true, kartId: data.id, message: 'Kart inserido com sucesso' });
      }
    });
  }
}

module.exports = IpcHandler;