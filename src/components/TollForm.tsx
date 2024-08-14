import React, { useState, useEffect } from "react";
import { TollTransaction } from "../types";

// TODO: remove ? once props are defined in App
interface TollFormProps {
  onSubmit: (
    transaction: Omit<TollTransaction, "id"> | TollTransaction
  ) => void;
  onCancel: () => void;
  selectedTransaction?: TollTransaction | null;
}
const TollForm: React.FC<TollFormProps> = ({
  onSubmit,
  onCancel,
  selectedTransaction,
}: TollFormProps) => {
  // state to manage form
  const [vehicleId, setVehicleId] = useState<string>("");
  const [tollBoothId, setTollBoothId] = useState<string>("");
  const [amountPaid, setAmountPaid] = useState<number>(0);

  //looks for changes to selectedTransaction and sets state based on inputs
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

  const handleSubmit = () => {
    // use the optional chain operator to avoid error for methods with undefined
    onSubmit?.({
      id: selectedTransaction ? selectedTransaction.id : undefined,
      vehicleId,
      tollBoothId,
      amountPaid,
    });
    resetForm();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          placeholder="Enter Vehicle ID"
        />
      </div>
      <div>
        <input
          type="text"
          value={tollBoothId}
          onChange={(e) => setTollBoothId(e.target.value)}
          placeholder="Enter Toll Booth ID"
        />
      </div>
      <div>
        <input
          type="text"
          value={amountPaid}
          onChange={(e) => setAmountPaid(Number(e.target.value))}
          placeholder="Enter Amount Paid"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>
          {selectedTransaction ? "Update transaction" : "Add Transaction"}
        </button>
        {selectedTransaction && <button onClick={onCancel}>Cancel Edit</button>}
      </div>
    </div>
  );
};

export default TollForm;
