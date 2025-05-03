import pandas as pd
from prophet import Prophet

class DemandForecaster:
    def __init__(self, data_path: str):
        """
        Initializes the forecaster with the dataset.
        """
        self.df = pd.read_csv(data_path)
        self.df["date"] = pd.to_datetime(self.df["date"])
        self.df["sku"] = self.df["sku"].astype(str)

    def get_skus(self):
        """
        Returns a list of unique SKU identifiers.
        """
        return self.df["sku"].unique().tolist()

    def forecast(self, sku: str, periods: int = 30):
        """
        Runs Prophet forecasting on a given SKU.
        """
        sku_df = self.df[self.df["sku"] == sku][["date", "quantity"]].copy()
        if sku_df.empty:
            raise ValueError(f"No data found for SKU: {sku}")

        sku_df.rename(columns={"date": "ds", "quantity": "y"}, inplace=True)
        model = Prophet()
        model.fit(sku_df)

        future = model.make_future_dataframe(periods=periods)
        forecast = model.predict(future)

        return forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(periods + 30).to_dict(orient="records")