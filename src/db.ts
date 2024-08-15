import initSqlJs, { Database } from "sql.js";
import { TollTransaction } from "./types";

// Test if WebAssembly is set up
// console.log(typeof WebAssembly === "object");

// Use a relative path to the wasm file
const sqlWasmPath = "/path/to/your/sql-wasm.wasm";

// Initially setting db to null allows the program to reference the variable and later assign it the actual database connection once it's ready.
let db: Database | null = null;

// Initialize the database
export const initDB = async (): Promise<void> => {
  const SQL = await initSqlJs({
    locateFile: () => sqlWasmPath,
  });
  db = new SQL.Database();
  // Command to create the toll_transactions table if it doesn't exist
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

// Add a new toll transaction
export const addTollTransaction = (
  transaction: Omit<TollTransaction, "id">
): TollTransaction => {
  if (!db) throw new Error("Database not initialized");
  const id = getNextId();

  // allow for undefined values
  const vehicleId = transaction.vehicleId || "";
  const tollBoothId = transaction.tollBoothId || "";
  const amountPaid =
    transaction.amountPaid !== undefined ? transaction.amountPaid : 0;

  // Command to insert the new transaction into the toll_transactions table
  db.run(
    `INSERT INTO toll_transactions (id, vehicleId, tollBoothId, amountPaid) VALUES (?, ?, ?, ?)`,
    [id, vehicleId, tollBoothId, amountPaid]
  );

  // Return the complete transaction object including the newly assigned ID
  return { id, vehicleId, tollBoothId, amountPaid };
};

// Update an existing toll transaction
export const updateTollTransaction = (
  updatedTransaction: TollTransaction
): void => {
  if (!db) throw new Error("Database not initialized");

  // allow for undefined values
  const vehicleId = updatedTransaction.vehicleId || "";
  const tollBoothId = updatedTransaction.tollBoothId || "";
  const amountPaid =
    updatedTransaction.amountPaid !== undefined
      ? updatedTransaction.amountPaid
      : 0;

  // Command to update the toll_transactions table with the new values
  db.run(
    "UPDATE toll_transactions SET vehicleId = ?, tollBoothId = ?, amountPaid = ? WHERE id = ?",
    [vehicleId, tollBoothId, amountPaid, updatedTransaction.id]
  );
};

// Delete a toll transaction
export const deleteTollTransaction = (id: number): void => {
  if (!db) throw new Error("Database not initialized");
  // Command to delete the toll_transactions record with the given ID
  db.run("DELETE FROM toll_transactions WHERE id = ?", [id]);
};

// Retrieve all toll transactions
export const getAllTollTransactions = (): TollTransaction[] => {
  if (!db) throw new Error("Database not initialized");

  // Use exec to execute the query; it returns an array of objects
  const result = db.exec("SELECT * FROM toll_transactions;");
  // Map each row in the result to a TollTransaction object
  return result[0]
    ? // if records are found, return the table values
      result[0].values.map((row: any) => ({
        id: row[0],
        vehicleId: row[1],
        tollBoothId: row[2],
        amountPaid: row[3],
      }))
    : // If no records are found, return an empty array
      [];
};
