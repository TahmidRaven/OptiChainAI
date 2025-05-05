import pandas as pd
from prophet import Prophet
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from datetime import timedelta
from typing import Dict

class DemandForecaster:
    def __init__(self):
        self.models = {}

    def prepare_time_series_data(self, df: pd.DataFrame, sku: str) -> pd.DataFrame:
        """Prepare time series data for a specific SKU"""
        sku_data = df[df['sku'] == sku].copy()
        sku_data = sku_data.sort_values('date')
        sku_data.set_index('date', inplace=True)
        return sku_data['sales'].resample('D').sum().fillna(0)

    async def train_holt_winters(self, ts_data: pd.Series) -> ExponentialSmoothing:
        """Train Holt-Winters exponential smoothing model"""
        model = ExponentialSmoothing(
            ts_data,
            trend='add',
            seasonal='add',
            seasonal_periods=7
        ).fit()
        return model

    async def train_random_forest(self, df: pd.DataFrame, sku: str) -> Dict:
        """Train Random Forest model with additional features"""
        sku_data = df[df['sku'] == sku].copy()
        sku_data['day_of_week'] = sku_data['date'].dt.dayofweek
        sku_data['month'] = sku_data['date'].dt.month
        sku_data['price_diff'] = sku_data['our_price_usd'] - sku_data['competitor_price_usd']
        
        X = sku_data[['day_of_week', 'month', 'supplier_rating', 'price_diff', 'stock_level']]
        y = sku_data['sales']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        
        y_pred = model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        
        return {'model': model, 'mae': mae}

    async def train_prophet(self, df: pd.DataFrame, sku: str) -> Prophet:
        """Train Prophet model"""
        sku_data = df[df['sku'] == sku].copy()

        # Prophet requires 'ds' and 'y' columns
        sku_data = sku_data.rename(columns={'date': 'ds', 'sales': 'y'})
        
        model = Prophet(daily_seasonality=True)
        model.fit(sku_data[['ds', 'y']])
        
        return model

    async def forecast_demand(self, df: pd.DataFrame, sku: str, forecast_days: int = 30) -> Dict:
        """Generate demand forecast for a specific SKU"""
        ts_data = self.prepare_time_series_data(df, sku)
        
        # Holt-Winters Forecast
        hw_model = await self.train_holt_winters(ts_data)
        hw_forecast = hw_model.forecast(forecast_days)

        # Random Forest Forecast
        rf_result = await self.train_random_forest(df, sku)
        rf_model = rf_result['model']

        last_date = df['date'].max()
        future_dates = [last_date + timedelta(days=i) for i in range(1, forecast_days + 1)]

        future_data = pd.DataFrame({
            'date': future_dates,
            'day_of_week': [d.dayofweek for d in future_dates],
            'month': [d.month for d in future_dates],
            'supplier_rating': df['supplier_rating'].mean(),
            'price_diff': df['our_price_usd'].mean() - df['competitor_price_usd'].mean(),
            'stock_level': df['stock_level'].mean()
        })

        X_future = future_data[['day_of_week', 'month', 'supplier_rating', 'price_diff', 'stock_level']]
        rf_forecast = rf_model.predict(X_future)

        # Prophet Forecast
        prophet_model = await self.train_prophet(df, sku)
        future_prophet = prophet_model.make_future_dataframe(periods=forecast_days)
        prophet_forecast = prophet_model.predict(future_prophet)['yhat'][-forecast_days:].values

        # Combine results
        forecast_df = pd.DataFrame({
            'date': future_dates,
            'hw_forecast': hw_forecast.values,
            'rf_forecast': rf_forecast,
            'prophet_forecast': prophet_forecast,
            'ensemble_forecast': (hw_forecast.values + rf_forecast + prophet_forecast) / 3
        })

        return {
            'sku': sku,
            'forecast': forecast_df.to_dict('records'),
            'random_forest_mae': rf_result['mae'],
        }
