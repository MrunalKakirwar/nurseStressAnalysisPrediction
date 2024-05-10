import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function PolarPlot({ data, chartId }) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  console.log("Polar Plot -->",data);

  useEffect(() => {
    const prepareChartDataFromJSON = () => {
      try {
        // Extracting data from JSON object
        const X = data.map(item => parseFloat(item.X));
        const Y = data.map(item => parseFloat(item.Y));
        const Z = data.map(item => parseFloat(item.Z));

        // Setting chart data
        setChartData({
          labels: ['X', 'Y', 'Z'],
          datasets: [
            {
              label: 'Orientation Data',
              data: [calculateMeanAngle(X), calculateMeanAngle(Y), calculateMeanAngle(Z)],
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            }
          ]
        });
      } catch (error) {
        console.error('Error preparing chart data from JSON:', error);
      }
    };

    const calculateMeanAngle = (angles) => {
      const sinSum = angles.reduce((acc, angle) => acc + Math.sin(angle * (Math.PI / 180)), 0);
      const cosSum = angles.reduce((acc, angle) => acc + Math.cos(angle * (Math.PI / 180)), 0);
      const meanAngle = Math.atan2(sinSum / angles.length, cosSum / angles.length);
      return meanAngle >= 0 ? meanAngle * (180 / Math.PI) : (2 * Math.PI + meanAngle) * (180 / Math.PI);
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
          type: 'polarArea',
          data: chartData,
          options: {
            scales: {
              r: {
                suggestedMin: 0,
                suggestedMax: 360
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

export default PolarPlot;
