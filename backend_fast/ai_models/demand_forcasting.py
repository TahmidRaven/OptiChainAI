import pandas as pd
from prophet import Prophet
from sqlalchemy.orm import Session
from models import SalesData

class DemandForecaster:
    def __init__(self, db: Session):
        records = db.query(SalesData).all()
        self.df = pd.DataFrame([{
            "sku": r.sku,
            "date": r.date,
            "quantity": r.quantity
        } for r in records])
        self.df["date"] = pd.to_datetime(self.df["date"])

    def get_skus(self):
        return self.df["sku"].unique().tolist()

    def forecast(self, sku: str, periods: int = 30):
        sku_df = self.df[self.df["sku"] == sku][["date", "quantity"]].copy()
        if sku_df.empty:
            raise ValueError(f"No data found for SKU: {sku}")

        sku_df.rename(columns={"date": "ds", "quantity": "y"}, inplace=True)
        model = Prophet()
        model.fit(sku_df)

        future = model.make_future_dataframe(periods=periods)
        forecast = model.predict(future)

        return forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(periods + 30).to_dict(orient="records")
