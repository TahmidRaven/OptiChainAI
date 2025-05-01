import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ForecastChart = ({ sku }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/forecast/${sku}`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [sku]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="ds" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="yhat" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart;
