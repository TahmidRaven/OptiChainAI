import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.forecast) return null;

  const labels = forecastData.forecast.map(item => new Date(item.date).toLocaleDateString());
  const hwData = forecastData.forecast.map(item => item.hw_forecast);
  const rfData = forecastData.forecast.map(item => item.rf_forecast);
  const prophetData = forecastData.forecast.map(item => item.prophet_forecast);
  const ensembleData = forecastData.forecast.map(item => item.ensemble_forecast);

  const data = {
    labels,
    datasets: [
      {
        label: 'Holt-Winters Forecast',
        data: hwData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Random Forest Forecast',
        data: rfData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Prophet Forecast',
        data: prophetData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Ensemble Forecast',
        data: ensembleData,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Demand Forecast for ${forecastData.sku}`,
      },
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Demand Forecast for {forecastData.sku}
      </Typography>
      <Box sx={{ height: '400px' }}>
        <Line options={options} data={data} />
      </Box>
    </Box>
  );
};

export default ForecastChart;
