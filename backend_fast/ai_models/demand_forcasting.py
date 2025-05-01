import pandas as pd
from prophet import Prophet


def forecast_sku(dataframe, sku, periods=30):
    df = dataframe[dataframe["sku"] == sku][["date", "sales"]].copy()
    df.columns = ["ds", "y"]
    df["ds"] = pd.to_datetime(df["ds"])

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)

    return forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]]