import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function BarChartFromJSON({data, chartId}) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  console.log("jsonData",data);

  useEffect(() => {
    // Function to prepare chart data from JSON data
    const prepareChartDataFromJSON = () => {
      try {
        // Extracting data from JSON object
        const labels = data.map(item => item.label);
        const hrData = data.map(item => parseFloat(item.mean_HR));
        const tempData = data.map(item => parseFloat(item.mean_TEMP));
        const edaData = data.map(item => parseFloat(item.mean_EDA));

        // Setting chart data
        setChartData({
          labels: labels,
          datasets: [{
            label: 'HR',
            data: hrData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)'
          }, {
            label: 'TEMP',
            data: tempData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)'
          }, {
            label: 'EDA',
            data: edaData,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)'
          }]
        });
      } catch (error) {
        console.error('Error preparing chart data from JSON:', error);
      }
    };

    prepareChartDataFromJSON();
  }, [data]);

  useEffect(() => {
    // Function to draw chart
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
              y: {
                beginAtZero: true
              }
            }
          }
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

  return <canvas id={chartId} width="400" height="400"></canvas>;
}

export default BarChartFromJSON;
