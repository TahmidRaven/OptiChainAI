import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const ForecastChart = () => {
  const [skuList, setSkuList] = useState([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [data, setData] = useState([]);

  // Fetch SKU list
  useEffect(() => {
    fetch("http://localhost:8000/skus")
      .then((res) => res.json())
      .then((json) => {
        setSkuList(json);
        setSelectedSku(json[0]); // Set default SKU
      })
      .catch((err) => console.error("Failed to load SKU list:", err));
  }, []);

  // Fetch forecast when SKU changes
  useEffect(() => {
    if (selectedSku) {
      fetch(`http://localhost:8000/forecast/${selectedSku}`)
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error("Failed to load forecast:", err));
    }
  }, [selectedSku]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📈 Demand Forecast Chart</h2>

      {skuList.length > 0 && (
        <>
          <label htmlFor="sku-select">Select SKU:</label>
          <select
            id="sku-select"
            value={selectedSku}
            onChange={(e) => setSelectedSku(e.target.value)}
            style={{ marginLeft: "1rem", padding: "0.5rem" }}
          >
            {skuList.map((sku) => (
              <option key={sku} value={sku}>
                {sku}
              </option>
            ))}
          </select>
        </>
      )}

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ds" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="yhat"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ marginTop: "2rem" }}>No forecast data available.</p>
      )}
    </div>
  );
};

export default ForecastChart;
