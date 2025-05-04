# ai_services.py

import pandas as pd
from collections import defaultdict
from statistics import mean

def calculate_inventory_threshold(avg_daily_sales, lead_time_days):
    """
    Calculates safety stock and reorder point.
    """
    safety_stock = avg_daily_sales * lead_time_days * 0.5
    reorder_point = avg_daily_sales * lead_time_days + safety_stock
    return {
        "reorder_point": round(reorder_point),
        "safety_stock": round(safety_stock)
    }

def optimize_inventory(df: pd.DataFrame):
    """
    For each SKU, calculate reorder point & safety stock.
    """
    recommendations = []
    grouped = df.groupby('sku')

    for sku, group in grouped:
        avg_sales = group['sales'].mean()
        current_stock = group.iloc[-1]['stock_level']
        lead_time = group.iloc[-1]['supplier_lead_time_days']
        
        thresholds = calculate_inventory_threshold(avg_sales, lead_time)
        recommendations.append({
            "sku": sku,
            "avg_daily_sales": round(avg_sales, 2),
            "current_stock": current_stock,
            **thresholds
        })

    return recommendations


def score_suppliers(df: pd.DataFrame):
    """
    Compute supplier scores based on inverse lead time and rating.
    """
    supplier_data = df.groupby('sku').last()
    results = []

    for _, row in supplier_data.iterrows():
        score = (1 / row['supplier_lead_time_days']) * 0.6 + row['supplier_rating'] * 0.4
        results.append({
            "sku": row.name,
            "supplier_lead_time_days": row['supplier_lead_time_days'],
            "supplier_rating": row['supplier_rating'],
            "score": round(score, 2)
        })

    return sorted(results, key=lambda x: x["score"], reverse=True)


def suggest_purchase_orders(df: pd.DataFrame):
    """
    Suggest restocking quantities based on inventory thresholds.
    """
    suggestions = []
    inv_thresholds = optimize_inventory(df)

    for item in inv_thresholds:
        if item['current_stock'] < item['reorder_point']:
            suggestions.append({
                "sku": item["sku"],
                "current_stock": item["current_stock"],
                "reorder_point": item["reorder_point"],
                "suggested_order_qty": item["reorder_point"] - item["current_stock"]
            })

    return suggestions


def recommend_price(df: pd.DataFrame):
    """
    Recommend optimal price based on competitor price, own price, and sales trends.
    """
    grouped = df.groupby('sku')
    recommendations = []

    for sku, group in grouped:
        competitor_price = group['competitor_price_usd'].mean()
        our_price = group['our_price_usd'].mean()
        demand_factor = group['sales'].mean() / 100  # Normalize

        recommended_price = round(0.4 * competitor_price + 0.3 * our_price + 0.3 * (demand_factor * 10), 2)

        recommendations.append({
            "sku": sku,
            "competitor_price": round(competitor_price, 2),
            "our_price": round(our_price, 2),
            "recommended_price": recommended_price
        })

    return recommendations
