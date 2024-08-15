import React, { useState, useEffect } from "react";
import { TollTransaction } from "../types";

interface TollFormProps {
  onSubmit: (
    transaction: Omit<TollTransaction, "id"> | TollTransaction
  ) => void;
  onCancel: () => void;
  selectedTransaction?: TollTransaction | null;
  className?: string;
}
const TollForm: React.FC<TollFormProps> = ({
  onSubmit,
  onCancel,
  selectedTransaction,
  className,
}: TollFormProps) => {
  // state to manage form
  const [vehicleId, setVehicleId] = useState<string>("");
  const [tollBoothId, setTollBoothId] = useState<string>("");
  const [amountPaid, setAmountPaid] = useState<number>(0);

  //looks for changes to selectedTransaction array and sets state based on inputs
  useEffect(() => {
    if (selectedTransaction) {
      setVehicleId(selectedTransaction.vehicleId);
      setTollBoothId(selectedTransaction.tollBoothId);
      setAmountPaid(selectedTransaction.amountPaid);
    }
  }, [selectedTransaction]);

  const resetForm = () => {
    setVehicleId("");
    setTollBoothId("");
    setAmountPaid(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transaction: Partial<TollTransaction> = {
      id: selectedTransaction?.id, // Use selectedTransaction id if available, otherwise undefined
      vehicleId,
      tollBoothId,
      amountPaid,
    };

    if (selectedTransaction) {
      // If updating an existing transaction, pass the full object
      onSubmit(transaction as TollTransaction);
    } else {
      // If adding a new transaction, exclude the id field
      const { id, ...newTransaction } = transaction;
      onSubmit(newTransaction as Omit<TollTransaction, "id">);
    }

    resetForm();
  };
  const buttonClass = "border border-black hover:bg-red-100 m-1 p-1";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div>
        <label>
          Vehicle ID:
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Toll Booth ID:
          <input
            type="text"
            value={tollBoothId}
            onChange={(e) => setTollBoothId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Amount Paid:
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(Number(e.target.value))}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit" className={buttonClass}>
          {selectedTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
        <button type="button" onClick={onCancel} className={buttonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TollForm;
