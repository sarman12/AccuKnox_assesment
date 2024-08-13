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

function Circle() {
  const data = {
    labels: ['Failed', 'Warning', 'Not available', 'Passed'],
    datasets: [
      {
        data: [1689, 681, 300, 7253],
        backgroundColor: ['red', 'Yellow', 'Black', 'Green'],
      },
    ],
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
          <p>9923</p>
          <span>Total</span>
        </div>
      </div>
      <div className="chart-legend">
        <ul>
          <li><span className="dot red"></span>Failed (1689)</li>
          <li><span className="dot yellow"></span>Warning (681)</li>
          <li><span className="dot grey"></span>Not available (300)</li>
          <li><span className="dot green"></span>Passed (7253)</li>
        </ul>
      </div>
    </div>
  );
}

export default Circle;
