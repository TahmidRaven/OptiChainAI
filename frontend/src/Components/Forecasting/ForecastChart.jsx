import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import './ForecastChart.css';

const ForecastChart = () => {
  const [skuList, setSkuList] = useState([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch SKU list
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/skus")
      .then((res) => res.json())
      .then((json) => {
        setSkuList(json);
        setSelectedSku(json[0]); // Set default SKU
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load SKU list:", err);
        setLoading(false);
      });
  }, []);

  // Fetch forecast when SKU changes
  useEffect(() => {
    if (selectedSku) {
      setLoading(true);
      fetch(`http://localhost:8000/forecast/${selectedSku}`)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load forecast:", err);
          setLoading(false);
        });
    }
  }, [selectedSku]);

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <h2 className="forecast-title">
          <span className="forecast-icon">📈</span> Demand Forecast
        </h2>
        
        {skuList.length > 0 && (
          <div className="sku-selector">
            <label htmlFor="sku-select" className="sku-label">Select SKU:</label>
            <select
              id="sku-select"
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="sku-select"
            >
              {skuList.map((sku) => (
                <option key={sku} value={sku}>
                  {sku}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="chart-container">
        {loading ? (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
            <p>Loading forecast data...</p>
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="ds" 
                stroke="#64748b"
                tick={{ fill: '#475569' }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fill: '#475569' }}
              />
              <Tooltip 
                contentStyle={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="yhat"
                stroke="#0546b0"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#043a8f' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-data">
            <p>No forecast data available for the selected SKU.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastChart;