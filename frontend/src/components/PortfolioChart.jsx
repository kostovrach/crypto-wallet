import { Chart as ChartJS, ArcElement, Tooltip, Legend, layouts } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();

  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: "$",
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          "rgba(19, 47, 73, 0.9)",
          "rgba(46, 139, 146, 0.9)",
          "rgba(108, 122, 137, 0.9)",
          "rgba(27, 79, 114, 0.9)",
          "rgba(75, 92, 107, 0.9)",
          "rgba(213, 216, 220, 0.9)",
          "rgba(22, 105, 122, 0.9)",
        ],
        borderColor: [
          "rgba(19, 47, 73, 1)",
          "rgba(46, 139, 146, 1)",
          "rgba(108, 122, 137, 1)",
          "rgba(27, 79, 114, 1)",
          "rgba(75, 92, 107, 1)",
          "rgba(213, 216, 220, 1)",
          "rgba(22, 105, 122, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: 550,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: 400,
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}
