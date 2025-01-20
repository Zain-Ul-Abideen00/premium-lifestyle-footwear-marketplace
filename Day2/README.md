# **Marketplace Technical Foundation - Steplo**

---

## **1. System Architecture Overview**

### **System Architecture Diagram**
```mermaid
graph TB

    %% Define classes with fill colors
    classDef frontend fill:#64B5F6, stroke:#336699, color:black
    classDef backend fill:#FFA726, stroke:#CC6600, color:black
    classDef thirdParty fill:#90A4AE, stroke:#666666, color:black

    %% Frontend subgraph
    subgraph Frontend[Next.js]
        UI[User Interface]:::frontend
        COMP[UI Components]:::frontend
        HOOKS[Custom Hooks]:::frontend
    end

    %% Backend Services subgraph
    subgraph Backend Services
        SANITY[Sanity CMS]:::backend
    end

    %% Third-Party APIs subgraph
    subgraph Third-Party APIs
        STRIPE[Stripe Payment]:::thirdParty
        SHIPPING[Shipping Provider API]:::thirdParty
        NEXTAUTH[Next-Auth]:::thirdParty
        CDN[Image CDN]:::thirdParty
    end

    %% Interactions
    UI -->|Browse Products| COMP
    COMP -->|Fetch Data| SANITY
    SANITY -->|Return Product Data| COMP
    COMP -->|Display Products| UI
    UI -->|Place Order| HOOKS
    HOOKS -->|Send Order Data| SANITY
    SANITY -->|Record Order| HOOKS
    HOOKS -->|Fetch Tracking| SHIPPING
    SHIPPING -->|Return Tracking Info| HOOKS
    HOOKS -->|Process Payment| STRIPE
    STRIPE -->|Payment Confirmation| HOOKS
    HOOKS -->|Display Confirmation| UI
    COMP -->|Fetch Images| CDN
    CDN -->|Provide Images| COMP
```

### **Component Roles**
- **Frontend (Next.js)**:
  - **User Interface (UI)**: The visual layer where users interact with the marketplace.
  - **UI Components**: Reusable components for product listings, cart, checkout, etc.
  - **Custom Hooks**: Handle API requests, state management, and data fetching.
- **Backend Services**:
  - **Sanity CMS**: Manages product data, customer details, and order records.
  - **Third-Party APIs**:
    - **Stripe Payment**: Processes payments securely.
    - **Shipping Provider API**: Provides real-time shipment tracking.
    - **Next-Auth**: Handles user authentication.
    - **Image CDN**: Optimizes image delivery for faster loading.

---

## **2. Key Workflows**

### **User Registration**
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant S as Sanity CMS
    participant Auth as Auth Provider

    U->>F: Visits registration page
    F->>A: Submit registration data
    A->>Auth: Validate credentials
    Auth-->>A: Return auth token
    A->>S: Store user profile
    S-->>A: Confirm storage
    A-->>F: Return success response
    F-->>U: Show confirmation

    Note over U,F: User receives welcome email
    Note over A,S: User data stored securely
    Note over Auth: Authentication token generated
```

### **Product Browsing**
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant S as Sanity CMS

    U->>F: Visits product listing page
    F->>A: Fetch product data
    A->>S: Query products
    S-->>A: Return product data
    A-->>F: Display products
    F-->>U: Show product listings
```

### **Order Placement**
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant S as Sanity CMS
    participant STRIPE as Stripe
    participant SHIP as Shipping Provider

    U->>F: Adds items to cart
    F->>A: Send order details
    A->>S: Record order
    S-->>A: Confirm order
    A->>STRIPE: Process payment
    STRIPE-->>A: Payment confirmation
    A->>SHIP: Initiate shipment
    SHIP-->>A: Return tracking ID
    A-->>F: Display confirmation
    F-->>U: Show order summary
```

### **Shipment Tracking**
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant SHIP as Shipping Provider

    U->>F: Visits order tracking page
    F->>A: Fetch tracking info
    A->>SHIP: Query shipment status
    SHIP-->>A: Return tracking details
    A-->>F: Display tracking info
    F-->>U: Show shipment status
```

---

## **3. Category-Specific Instructions**

### **General eCommerce**
- **Workflows**:
  - **Product Browsing**: Users can filter products by category, size, price range, and color.
  - **Cart Management**: Users can add/remove items, update quantities, and apply discounts.
  - **Order Placement**: Users can place orders, select shipping methods, and make payments.
- **Example Endpoint**:
  - **Endpoint**: `/api/products`
  - **Method**: `GET`
  - **Purpose**: Fetch all product details.
  - **Response Example**:
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

---

## **4. API Endpoints**

### **API Specification**
| **Endpoint**         | **Method** | **Description**                          | **Response Example**                                                                 |
|-----------------------|------------|------------------------------------------|-------------------------------------------------------------------------------------|
| `/api/products`       | `GET`      | Fetch all products.                      | `[{ "id": "123", "name": "Running Shoes", "price": 120, "stock": 50, "image": "..." }]` |
| `/api/products/{id}`  | `GET`      | Fetch details of a specific product.     | `{ "id": "123", "name": "Running Shoes", "price": 120, "stock": 50, "image": "..." }`  |
| `/api/orders`         | `POST`     | Create a new order.                      | `{ "orderId": "ORD123", "status": "Success", "message": "Order created successfully." }` |
| `/api/shipment`       | `GET`      | Track order status.                      | `{ "shipmentId": "SHIP123", "status": "In Transit", "expectedDeliveryDate": "..." }`    |

---

## **5. Sanity Schema**

### **Product Schema**
```javascript
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name'
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}]
    },
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'color', type: 'string'},
          {name: 'size', type: 'string'},
          {name: 'stock', type: 'number'},
          {name: 'images', type: 'array', of: [{type: 'image'}]}
        ]
      }]
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
```

---

### **Order Schema**
```javascript
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
    },
    {
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{type: 'customer'}]
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'product', type: 'reference', to: [{type: 'product'}]},
            {name: 'quantity', type: 'number'},
            {name: 'price', type: 'number'},
            {name: 'size', type: 'string'},
            {name: 'color', type: 'string'}
          ]
        }
      ]
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number'
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: ['Pending', 'Paid', 'Failed']
      }
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'text'
    },
    {
      name: 'shippingMethod',
      title: 'Shipping Method',
      type: 'string',
      options: {
        list: ['Standard', 'Express']
      }
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime'
    },
    {
      name: 'deliveryETA',
      title: 'Delivery ETA',
      type: 'datetime'
    }
  ]
}
```

---

### **Customer Schema**
```javascript
export default {
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    {
      name: 'customerId',
      title: 'Customer ID',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
    },
    {
      name: 'sizePreferences',
      title: 'Size Preferences',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'stylePreferences',
      title: 'Style Preferences',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'orderHistory',
      title: 'Order History',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'order'}]}]
    }
  ]
}
```

---

### **Category Schema**
```javascript
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name'
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
```

---

### **Inventory Schema**
```javascript
export default {
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}]
    },
    {
      name: 'sizeDistribution',
      title: 'Size Distribution',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'size', type: 'string'},
            {name: 'stock', type: 'number'}
          ]
        }
      ]
    },
    {
      name: 'colorVariants',
      title: 'Color Variants',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'reorderLevel',
      title: 'Reorder Level',
      type: 'number'
    },
    {
      name: 'lastRestockDate',
      title: 'Last Restock Date',
      type: 'datetime'
    }
  ]
}
```

---

### **Shipment Schema**
```javascript
export default {
  name: 'shipment',
  title: 'Shipment',
  type: 'document',
  fields: [
    {
      name: 'shipmentId',
      title: 'Shipment ID',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'reference',
      to: [{type: 'order'}]
    },
    {
      name: 'deliveryZone',
      title: 'Delivery Zone',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Pending', 'Shipped', 'In Transit', 'Delivered']
      }
    },
    {
      name: 'deliverySLA',
      title: 'Delivery SLA',
      type: 'string',
    }
  ]
}
```

---

## 6. Technical Roadmap

### Phase 1: Core Features
- **Frontend**:
  - Implement essential pages: Home, Product Listing, Product Details, Cart, Checkout.
  - Add responsive design for mobile and desktop.
- **Backend**:
  - Set up Sanity CMS for product and order management.
  - Integrate Stripe for payment processing.
- **APIs**:
  - Implement `/api/products` and `/api/orders` endpoints.

### Phase 2: Enhanced Features
- **Frontend**:
  - Add advanced features: size selection, color variants, related products.
  - Implement user dashboard for order tracking.
- **Backend**:
  - Add inventory management and low stock alerts.
  - Integrate shipment tracking API.
- **APIs**:
  - Implement `/api/shipment` and `/api/users` endpoints.

### Phase 3: Optimization and Launch
- **Performance**:
  - Optimize images and enable caching.
  - Use Next.js’s built-in optimizations.
- **SEO**:
  - Add meta tags and structured data.
- **Testing**:
  - Test for usability, performance, and security.
- **Launch**:
  - Deploy on Vercel and monitor performance.
