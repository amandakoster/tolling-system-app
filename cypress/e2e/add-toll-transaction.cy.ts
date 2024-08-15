import { defineConfig } from "cypress";
const sqlite3 = require("sqlite3").verbose();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on: Cypress.PluginEvents) {
      // Register tasks
      on("task", {
        initDB() {
          return new Promise<void>((resolve, reject) => {
            console.log("Initializing database...");
            const db = new sqlite3.Database("./my_database.sqlite"); // Ensure this is the correct path to your DB

            const createTableQuery = `
              CREATE TABLE IF NOT EXISTS toll_transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vehicleId TEXT,
                tollBoothId TEXT,
                amountPaid INTEGER
              );
            `;

            db.run(createTableQuery, function (err: Error) {
              if (err) {
                console.error("Error creating table:", err);
                reject(err);
              } else {
                console.log(
                  "Table toll_transactions created or already exists."
                );
                resolve(); // Resolve the promise to signal completion
              }
            });

            db.close();
          });
        },

        addTollTransaction({
          vehicleId,
          tollBoothId,
          amountPaid,
        }: {
          vehicleId: string;
          tollBoothId: string;
          amountPaid: number;
        }) {
          return new Promise((resolve, reject) => {
            console.log(
              `Adding toll transaction: ${vehicleId}, ${tollBoothId}, ${amountPaid}`
            );
            const db = new sqlite3.Database("./my_database.sqlite");

            const insertQuery = `
              INSERT INTO toll_transactions (vehicleId, tollBoothId, amountPaid)
              VALUES (?, ?, ?);
            `;

            db.run(
              insertQuery,
              [vehicleId, tollBoothId, amountPaid],
              (err: Error) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ id: this.lastID }); // Retrieve last inserted ID
                }
              }
            );

            db.close();
          });
        },

        runQuery({ query, params }: { query: string; params: any[] }) {
          return new Promise((resolve, reject) => {
            console.log(`Running query: ${query} with params: ${params}`);
            const db = new sqlite3.Database("./my_database.sqlite");

            db.all(query, params, (err: Error, rows: any[]) => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
            });

            db.close();
          });
        },

        getNextId() {
          return new Promise((resolve, reject) => {
            console.log("Getting next available ID...");
            const db = new sqlite3.Database("./my_database.sqlite");

            const query = "SELECT MAX(id) as maxId FROM toll_transactions";

            db.get(query, [], (err: Error, row: { maxId: number }) => {
              if (err) {
                reject(err);
              } else {
                const nextId = (row.maxId || 0) + 1;
                resolve(nextId);
              }
            });

            db.close();
          });
        },
      });
    },
  },
});
