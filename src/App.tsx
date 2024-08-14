import React, { useEffect, useState } from "react";
import "./App.css";
import TollForm from "./components/TollForm";
import TollList from "./components/TollList";
import TollChart from "./components/TollChart";
import { TollTransaction } from "./types";
import {
  initDB,
  addTollTransaction,
  updateTollTransaction,
  deleteTollTransaction,
  getAllTollTransactions,
} from "./db";

const App: React.FC = () => {
  console.log(typeof WebAssembly === "object");

  const [tollTransactions, setTollTransactions] = useState<TollTransaction[]>(
    []
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<TollTransaction | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      await initDB();
      const transactions = getAllTollTransactions();
      setTollTransactions(transactions);
    };
    initializeDB();
  }, []);

  useEffect(() => {
    // Simulate live data from multiple toll booths
    const simulateLiveData = setInterval(() => {
      const tollBoothIds = ["Booth-1", "Booth-2", "Booth-3", "Booth-4"];
      const randomVehicleId = `Vehicle-${Math.floor(Math.random() * 100)}`;
      const randomTollBoothId =
        tollBoothIds[Math.floor(Math.random() * tollBoothIds.length)];
      const randomAmountPaid = Math.floor(Math.random() * 100) + 1;

      handleAddToll({
        vehicleId: randomVehicleId,
        tollBoothId: randomTollBoothId,
        amountPaid: randomAmountPaid,
      });
    }, 3000);

    // Cleanup on component unmount
    return () => clearInterval(simulateLiveData);
  }, []);

  const handleAddOrUpdateToll = (
    transaction: Omit<TollTransaction, "id"> | TollTransaction
  ) => {
    if ("id" in transaction) {
      handleUpdateToll(transaction);
    } else {
      handleAddToll(transaction);
    }
  };

  const handleAddToll = (transaction: Omit<TollTransaction, "id">) => {
    const newTransaction = addTollTransaction(transaction);
    setTollTransactions((prev) => [...prev, newTransaction]);
  };

  const handleUpdateToll = (updatedTransaction: TollTransaction) => {
    updateTollTransaction(updatedTransaction);
    setTollTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setSelectedTransaction(null); // Clear selection after updating
  };

  const handleEditToll = (transaction: TollTransaction) => {
    setSelectedTransaction(transaction);
  };

  const handleDeleteToll = (id: number) => {
    deleteTollTransaction(id);
    setTollTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const handleCancelEdit = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="App">
      <h1>Tolling System App</h1>
      <TollForm
        onSubmit={handleAddOrUpdateToll}
        onCancel={handleCancelEdit}
        selectedTransaction={selectedTransaction}
      />
      <TollList
        transactions={tollTransactions}
        onEdit={handleEditToll}
        onDelete={handleDeleteToll}
      />
      <TollChart transactions={tollTransactions} />
    </div>
  );
};

export default App;
