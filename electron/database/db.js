const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'kart_core.db');

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado ao banco de dados SQLite.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS Kart (
  id INTEGER PRIMARY KEY, 
  modelo VARCHAR(30), 
  ano INTEGER, 
  pneu INTEGER, 
  gasolina INTEGER, 
  status INTEGER, 
  descricao TEXT
  );`
);

module.exports = db;
