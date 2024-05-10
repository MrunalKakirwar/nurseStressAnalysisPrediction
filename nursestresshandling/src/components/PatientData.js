import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function PatientBarChart({ data, chartId}) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  console.log("Patient -->",data);

  useEffect(() => {
    const prepareChartDataFromJSON = () => {
      try {
        // Extracting data from JSON object
        const ids = data.map(item => item.id);
        const mean_EDA = data.map(item => parseFloat(item.mean_EDA));
        const mean_HR = data.map(item => parseFloat(item.mean_HR));
        const mean_TEMP = data.map(item => parseFloat(item.mean_TEMP));

        // Setting chart data
        setChartData({
          labels: ids,
          datasets: [
            {
              label: 'Mean EDA',
              data: mean_EDA,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)'
            },
            {
              label: 'Mean HR',
              data: mean_HR,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)'
            },
            {
              label: 'Mean TEMP',
              data: mean_TEMP,
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
              borderColor: 'rgba(255, 206, 86, 1)'
            }
          ]
        });
      } catch (error) {
        console.error('Error preparing chart data from JSON:', error);
      }
    };

    prepareChartDataFromJSON();
  }, [data]);

  useEffect(() => {
    const drawChart = () => {
      if (chartData) {
        // Destroy previous chart instance if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create new chart instance
        const ctx = document.getElementById(chartId);
        chartRef.current = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              x: {
                stacked: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    drawChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData, chartId]);

  return <canvas id={chartId} width="600" height="400"></canvas>;
}

export default PatientBarChart;