import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

module.exports = (on: any) => {
  on("task", {
    initDB() {
      return new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run(
            "CREATE TABLE IF NOT EXISTS toll_transactions (id INTEGER PRIMARY KEY, vehicleId TEXT, tollBoothId TEXT, amountPaid INTEGER);",
            (err: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(null);
              }
            }
          );
        });
      });
    },
    runQuery({ query, params }: { query: string; params?: any[] }) {
      return new Promise((resolve, reject) => {
        db.all(query, params, (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },
  });
};
