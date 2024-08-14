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
        <div key={transaction.id}>
          <li>
            <span>Vehicle ID: {transaction.vehicleId}</span>
            <span>Toll Booth ID: {transaction.tollBoothId}</span>
            <span>Amount Paid: ${transaction.amountPaid}</span>
          </li>
          <button onClick={() => onEdit(transaction)}>Edit</button>
          <button onClick={() => onDelete(transaction.id)}>Delete</button>
        </div>
      ))}
    </ul>
  );
};

export default TollList;
