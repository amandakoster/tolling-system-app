import React from "react";
import { TollTransaction } from "../types";

interface TollListProps {
  transactions: TollTransaction[];
  onEdit: (transactions: TollTransaction) => void;
  onDelete: (id: number) => void;
}

const TollList: React.FC<TollListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  return (
    <ul>
      {transactions.map((transaction) => (
        <>
          <li key={transaction.id}>
            <span>Vehicle ID: {transaction.vehicleId}</span>
            <span>Toll Booth ID: {transaction.tollBoothId}</span>
            <span>Amount Paid: ${transaction.amountPaid}</span>
          </li>
          <div>
            <button onClick={() => onEdit(transaction)}>Edit</button>
            <button onClick={() => onDelete(transaction.id)}>Edit</button>
          </div>
        </>
      ))}
    </ul>
  );
};

export default TollList;
