// sql.js is a javascript SQL database. It allows you to create a relational database and query it entirely in the browser. You can try it in this online demo. It uses a virtual database file stored in memory, and thus doesn't persist the changes made to the database. However, it allows you to import any existing sqlite file, and to export the created database as a JavaScript typed array. from the docs: https://sql.js.org/#/
import initSqlJs, { Database } from "sql.js";
import { TollTransaction } from "./types";

//test if webassembly is set up
console.log(typeof WebAssembly === "object");

// Initially setting db to null allows the program to reference the variable and later assign it the actual database connection once it’s ready.
let db: Database | null = null;

export const initDB = async (): Promise<void> => {
  const sql = await initSqlJs();
  db = new sql.Database();
  // command to create the toll_transactions table if it doesn't exist
  // use db.run to execute the command
  db.run(
    "CREATE TABLE IF NOT EXISTS toll_transactions (id INTEGER PRIMARY KEY, vehicleId TEXT, tollBoothId TEXT, amountPaid INTEGER);"
  );
};

// Retrieves the next available ID for a new toll transaction.
export const getNextId = (): number => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  // Executes a query to get the maximum ID from the toll_transactions table
  const result = db.exec("SELECT MAX(id) FROM toll_transactions;");
  // Checks if the result is not null and returns the next ID
  const nextId =
    result.length > 0 && result[0].values[0][0] != null
      ? (result[0].values[0][0] as number) + 1 // if query returns a result, add 1 to the current max ID
      : 1;

  return nextId;
};

export const addTollTransaction = (
  transaction: Omit<TollTransaction, "id">
): TollTransaction => {
  if (!db) throw new Error("Database not initialized");
  const id = getNextId();
  //command to insert the new transaction into the toll_transactions table
  db.run(
    `INSERT INTO toll_transactions (id, vehicleId, tollBoothId, amountPaid) VALUES (${id}, ${transaction.vehicleId}, ${transaction.tollBoothId}, ${transaction.amountPaid})`
  );
  // Return the complete transaction object including the newly assigned ID
  return { id, ...transaction };
};

export const updateTollTransaction = (
  updatedTransaction: TollTransaction
): void => {
  if (!db) throw new Error("Database not initialized");

  db.run(
    // command to update the toll_transactions table with the new values
    "UPDATE toll_transactions SET vehicleId = ?, tollBoothId = ?, amountPaid = ? WHERE id = ?",
    // data to be updated
    [
      updatedTransaction.vehicleId,
      updatedTransaction.tollBoothId,
      updatedTransaction.amountPaid,
      updatedTransaction.id,
    ]
  );
  // Update the specific transaction in the toll_transactions table with the given ID
};

export const deleteTollTransaction = (id: number): void => {
  if (!db) throw new Error("Database not initialized");
  // command to delete the toll_transactions table with the given ID
  db.run("DELETE FROM toll_transactions WHERE id = ?", [id]);
};

export const getAllTollTransactions = (): TollTransaction[] => {
  if (!db) throw new Error("Database not initialized");

  // use exec to execute the query, it returns an array of objects
  const result = db.exec("SELECT * FROM toll_transactions;");
  // Map each row in the result to a TollTransaction object
  // If no records are found, return an empty array
  return result[0]
    ? result[0].values.map((row: any) => ({
        id: row[0],
        vehicleId: row[1],
        tollBoothId: row[2],
        amountPaid: row[3],
      }))
    : [];
};
