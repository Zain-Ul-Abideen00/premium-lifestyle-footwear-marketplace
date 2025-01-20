## **3. Plan API Requirements**

### **API Endpoints**

1. **Products API**:
   - **Endpoint Name**: `/api/products`
     - **Method**: `GET`
     - **Description**: Fetch all available products from Sanity CMS.
     - **Response**:
       ```json
       [
         {
           "id": "123",
           "name": "Premium Running Shoes",
           "price": 120,
           "stock": 50,
           "image": "https://cdn.example.com/shoes.jpg",
           "category": "Athletic",
           "sizes": ["7", "8", "9"],
           "colors": ["Black", "White"]
         },
         {
           "id": "456",
           "name": "Casual Sneakers",
           "price": 80,
           "stock": 30,
           "image": "https://cdn.example.com/sneakers.jpg",
           "category": "Casual",
           "sizes": ["8", "9", "10"],
           "colors": ["Blue", "Gray"]
         }
       ]
       ```

   - **Endpoint Name**: `/api/products/{id}`
     - **Method**: `GET`
     - **Description**: Fetch details of a specific product by ID.
     - **Response**:
       ```json
       {
         "id": "123",
         "name": "Premium Running Shoes",
         "price": 120,
         "stock": 50,
         "image": "https://cdn.example.com/shoes.jpg",
         "description": "High-performance running shoes for athletes.",
         "category": "Athletic",
         "sizes": ["7", "8", "9"],
         "colors": ["Black", "White"]
       }
       ```

   - **Endpoint Name**: `/api/products/search`
     - **Method**: `POST`
     - **Description**: Search products by name, category, or filters (e.g., price range, size, color).
     - **Payload**:
       ```json
       {
         "query": "Running Shoes",
         "filters": {
           "category": "Athletic",
           "priceRange": { "min": 100, "max": 150 },
           "size": "8",
           "color": "Black"
         }
       }
       ```
     - **Response**:
       ```json
       [
         {
           "id": "123",
           "name": "Premium Running Shoes",
           "price": 120,
           "stock": 50,
           "image": "https://cdn.example.com/shoes.jpg",
           "category": "Athletic",
           "sizes": ["7", "8", "9"],
           "colors": ["Black", "White"]
         }
       ]
       ```

2. **Orders API**:
   - **Endpoint Name**: `/api/orders`
     - **Method**: `POST`
     - **Description**: Create a new order in Sanity CMS.
     - **Payload**:
       ```json
       {
         "customerId": "789",
         "products": [
           {
             "id": "123",
             "name": "Premium Running Shoes",
             "price": 120,
             "quantity": 1,
             "size": "8",
             "color": "Black"
           }
         ],
         "paymentStatus": "Paid",
         "shippingAddress": "123 Main St, City, Country",
         "shippingMethod": "Standard"
       }
       ```
     - **Response**:
       ```json
       {
         "orderId": "ORD123",
         "status": "Success",
         "message": "Order created successfully."
       }
       ```

   - **Endpoint Name**: `/api/orders/{id}`
     - **Method**: `GET`
     - **Description**: Fetch details of a specific order by ID.
     - **Response**:
       ```json
       {
         "orderId": "ORD123",
         "customerId": "789",
         "products": [
           {
             "id": "123",
             "name": "Premium Running Shoes",
             "price": 120,
             "quantity": 1,
             "size": "8",
             "color": "Black"
           }
         ],
         "paymentStatus": "Paid",
         "shippingAddress": "123 Main St, City, Country",
         "shippingMethod": "Standard",
         "orderDate": "2023-10-15T12:00:00Z",
         "deliveryETA": "2023-10-20T12:00:00Z"
       }
       ```

3. **Shipment API**:
   - **Endpoint Name**: `/api/shipment`
     - **Method**: `GET`
     - **Description**: Track order status via a third-party shipping provider API.
     - **Response**:
       ```json
       {
         "shipmentId": "SHIP123",
         "orderId": "ORD123",
         "status": "In Transit",
         "expectedDeliveryDate": "2023-10-20T12:00:00Z",
         "trackingUrl": "https://tracking.example.com/SHIP123"
       }
       ```

4. **User API**:
   - **Endpoint Name**: `/api/users/register`
     - **Method**: `POST`
     - **Description**: Register a new user.
     - **Payload**:
       ```json
       {
         "name": "John Doe",
         "email": "john.doe@example.com",
         "password": "securepassword123",
         "address": "123 Main St, City, Country",
         "phone": "+1234567890"
       }
       ```
     - **Response**:
       ```json
       {
         "userId": "789",
         "status": "Success",
         "message": "User registered successfully."
       }
       ```

   - **Endpoint Name**: `/api/users/profile`
     - **Method**: `GET`
     - **Description**: Fetch user profile details.
     - **Response**:
       ```json
       {
         "userId": "789",
         "name": "John Doe",
         "email": "john.doe@example.com",
         "address": "123 Main St, City, Country",
         "phone": "+1234567890",
         "sizePreferences": ["8", "9"],
         "stylePreferences": ["Athletic", "Casual"]
       }
       ```

---
