import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function HistogramChart({ data, chartId }) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  console.log("Histogram Chart -->",data);

  useEffect(() => {
    const prepareChartDataFromJSON = () => {
      try {
        // Extracting data from JSON object
        const EDA = data.map(item => parseFloat(item.EDA));
        const HR = data.map(item => parseFloat(item.HR));
        const TEMP = data.map(item => parseFloat(item.TEMP));

        // Setting chart data
        setChartData({
          datasets: [
            {
              label: 'EDA Distribution',
              data: EDA,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
              label: 'HR Distribution',
              data: HR,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
              label: 'TEMP Distribution',
              data: TEMP,
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
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
                type: 'linear',
                position: 'bottom'
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

  return <canvas id={chartId} width="400" height="250"></canvas>;
}

export default HistogramChart;
