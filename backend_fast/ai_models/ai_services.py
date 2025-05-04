def calculate_inventory_threshold(current_stock, avg_sales, lead_time):
    safety_stock = avg_sales * lead_time * 0.5
    reorder_point = avg_sales * lead_time + safety_stock
    return {
        "reorder_point": round(reorder_point),
        "safety_stock": round(safety_stock)
    }

def score_suppliers(suppliers):
    results = []
    for s in suppliers:
        score = (1/s.avg_delivery_days * 0.4 +
                 s.order_accuracy * 0.3 +
                 1/s.price_rating * 0.3)
        results.append({"name": s.name, "score": round(score, 2)})
    return sorted(results, key=lambda x: x["score"], reverse=True)

def optimize_route(routes):
    best_route = min(routes, key=lambda r: r.distance_km * (1 + r.traffic_level))
    return {
        "origin": best_route.origin,
        "destination": best_route.destination,
        "estimated_time": round(best_route.distance_km / (50 * (1 - best_route.traffic_level)), 2)  # km/h
    }

def suggest_purchase_orders(inventories, sales_data):
    suggestions = []
    for inv in inventories:
        avg_sales = sum(sales_data.get(inv.sku, [0])) / len(sales_data.get(inv.sku, [1]))
        thresholds = calculate_inventory_threshold(inv.current_stock, avg_sales, inv.lead_time_days)
        if inv.current_stock < thresholds["reorder_point"]:
            suggestions.append({"sku": inv.sku, "suggested_order": thresholds["reorder_point"] - inv.current_stock})
    return suggestions

def recommend_price(prices):
    results = []
    for p in prices:
        # Price recommendation = weighted average of competitor, cost, demand
        rec_price = 0.4 * p.competitor_price + 0.3 * p.cost + 0.3 * (p.demand_score * 10)
        results.append({"sku": p.sku, "recommended_price": round(rec_price, 2)})
    return results

