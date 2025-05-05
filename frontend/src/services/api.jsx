import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSalesData = async (skip = 0, limit = 100) => {
  try {
    const response = await api.get(`/sales/?skip=${skip}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw error;
  }
};

export const getSalesBySku = async (sku) => {
  try {
    const response = await api.get(`/sales/${sku}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sales data for SKU ${sku}:`, error);
    throw error;
  }
};

export const uploadSalesData = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/sales/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading sales data:', error);
    throw error;
  }
};

export const getForecast = async (sku) => {
  try {
    const response = await api.get(`/forecast/${sku}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching forecast for SKU ${sku}:`, error);
    throw error;
  }
};
