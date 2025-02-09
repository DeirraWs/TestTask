// src/components/PopulationChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PopulationCount } from './CountryInfo';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PopulationChartProps {
  data: PopulationCount[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => {
  const sortedData = data.sort((a, b) => a.year - b.year);
  const chartData = {
    labels: sortedData.map(item => item.year),
    datasets: [
      {
        label: 'Population',
        data: sortedData.map(item => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default PopulationChart;
