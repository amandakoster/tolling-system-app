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
}

const TollChart: React.FC<TollChartProps> = ({ transactions }) => {
  const chartData = {
    labels: transactions.map(
      (transaction) => `Booth ${transaction.tollBoothId}`
    ),
    datasets: [
      {
        label: "Amount Paid",
        data: transactions.map((transaction) => transaction.amountPaid),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
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
    <div>
      <h2>Toll Transaction Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TollChart;
