import React from "react";
import { TollTransaction } from "../types";

interface TollListProps {
  transactions: TollTransaction[];
  onEdit: (transactions: TollTransaction) => void;
  onDelete: (id: number) => void;
  className?: string;
}

const TollList: React.FC<TollListProps> = ({
  transactions,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <div className={`${className} h-96`}>
      <ul>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <li>
              <span>Vehicle ID: {transaction.vehicleId}</span> <br />
              <span>Toll Booth ID: {transaction.tollBoothId}</span> <br />
              <span>Amount Paid: ${transaction.amountPaid}</span> <br />
            </li>
            <button
              onClick={() => onEdit(transaction)}
              className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TollList;
