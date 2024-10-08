import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { TollTransaction } from "../types";

// Register the components with ChartJS
ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

interface TollChartProps {
  transactions: TollTransaction[];
  className?: string;
}

const TollChart: React.FC<TollChartProps> = ({ transactions, className }) => {
  const chartData = {
    labels: transactions.map(
      (transaction) => `Booth ${transaction.tollBoothId}`
    ),
    datasets: [
      {
        label: "Amount Paid",
        data: transactions.map((transaction) => transaction.amountPaid),
        fill: false,
        backgroundColor: "rgba(0, 92, 194, 1)",
        borderColor: "rgba(0, 92, 194, 1)",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={className}>
      <h2>Toll Transaction Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TollChart;
