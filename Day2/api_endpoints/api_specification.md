# **4. API Endpoints**

## **API Specification**

| **Endpoint**         | **Method** | **Description**                          | **Response Example**                                                                 |
|-----------------------|------------|------------------------------------------|-------------------------------------------------------------------------------------|
| `/api/products`       | `GET`      | Fetch all products.                      | `[{ "id": "123", "name": "Running Shoes", "price": 120, "stock": 50, "image": "..." }]` |
| `/api/products/{id}`  | `GET`      | Fetch details of a specific product.     | `{ "id": "123", "name": "Running Shoes", "price": 120, "stock": 50, "image": "..." }`  |
| `/api/orders`         | `POST`     | Create a new order.                      | `{ "orderId": "ORD123", "status": "Success", "message": "Order created successfully." }` |
| `/api/shipment`       | `GET`      | Track order status.                      | `{ "shipmentId": "SHIP123", "status": "In Transit", "expectedDeliveryDate": "..." }`    |

---
