import React from 'react';
import './Dashboard.css';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Circle1() {
  const data = {
    labels: ["Connected", "Not Connected"],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: ["skyblue", "blue"],
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div className="cloud-account-risk-assessment">
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="chart-label">
          <p>2</p>
          <span>Total</span>
        </div>
      </div>
      <div className="chart-legend">
        <ul>
          <li><span className="dot blue"></span>Connected (1)</li>
          <li><span className="dot skyblue"></span>Not Connected (1)</li>
        </ul>
      </div>
    </div>
  );
}

export default Circle1;
