// cypress.config.js or cypress.config.ts
const { defineConfig } = require('cypress');
const sqlite3 = require("sqlite3").verbose();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        initDB() {
          return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./my_database.sqlite');
            const createTableQuery = `
              CREATE TABLE IF NOT EXISTS toll_transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vehicleId TEXT,
                tollBoothId TEXT,
                amountPaid INTEGER
              );
            `;
            db.run(createTableQuery, (err) => {
              if (err) {
                return reject(err);
              }
              resolve(null);
            });
            db.close();
          });
        },
        addTollTransaction({ vehicleId, tollBoothId, amountPaid }) {
          return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./my_database.sqlite');
            const insertQuery = `
              INSERT INTO toll_transactions (vehicleId, tollBoothId, amountPaid)
              VALUES (?, ?, ?);
            `;
            db.run(insertQuery, [vehicleId, tollBoothId, amountPaid], function (err) {
              if (err) {
                return reject(err);
              }
              resolve({ id: this.lastID });
            });
            db.close();
          });
        },
        runQuery({ query, params }) {
          return new Promise((resolve, reject) => {
            const db = new sqlite3.Database('./my_database.sqlite');
            db.all(query, params, (err, rows) => {
              if (err) {
                return reject(err);
              }
              resolve(rows);
            });
            db.close();
          });
        }
      });
    },
  },
});
