class KartModel {
  constructor(db) {
    this.db = db;
  }

  create(kart, callback) {
    const { modelo, ano, pneu, gasolina, status, descricao } = kart;
    this.db.run(
      'INSERT INTO Kart (modelo, ano, pneu, gasolina, status, descricao) VALUES (?, ?, ?, ?, ?, ?)',
      [modelo, ano, pneu, gasolina, status, descricao],
      function(err) {
        callback(err, { id: this.lastID });
      }
    );
  }
}

module.exports = KartModel;
