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
  const [streaming, setStreaming] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      await initDB();
      const transactions = getAllTollTransactions();
      setTollTransactions(transactions);
    };
    initializeDB();
  }, []);

  // Toggle live streaming data
  const toggleStreaming = () => {
    if (streaming) {
      // Cleanup on component unmount
      if (intervalId) clearInterval(intervalId);
    } else {
      const newIntervalId = setInterval(() => {
        const newTransaction = {
          vehicleId: `V-${Math.floor(Math.random() * 1000)}`,
          tollBoothId: `TB-${Math.floor(Math.random() * 10)}`,
          amountPaid: Math.floor(Math.random() * 100) + 1,
        };
        handleAddToll(newTransaction);
      }, 3000);
      setIntervalId(newIntervalId);
    }
    setStreaming(!streaming);
  };

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
    <div className="App p-4">
      <h1 className="text-3xl font-bold mb-4">Tolling System App</h1>
      <button
        onClick={toggleStreaming}
        className="
        bg-blue-500
        text-white
        m-2
        p-2
        rounded"
      >
        {streaming ? "Stop Streaming Data" : "Start Streaming Data"}
      </button>
      <TollForm
        onSubmit={handleAddOrUpdateToll}
        onCancel={handleCancelEdit}
        selectedTransaction={selectedTransaction}
      />
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/4 p-2">
          <TollList
            transactions={tollTransactions}
            onEdit={setSelectedTransaction}
            onDelete={handleDeleteToll}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-3/4 p-2">
          <TollChart transactions={tollTransactions} />
        </div>
      </div>
    </div>
  );
};

export default App;
