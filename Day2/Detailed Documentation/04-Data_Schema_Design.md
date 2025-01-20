## **Sanity Schema**

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

### **Key Relationships**
- **Customers** place **Orders**.
- **Orders** contain **Products**.
- **Products** belong to **Categories**.
- **Inventory** tracks stock levels for **Products**.
- **Shipments** are linked to **Orders**.

---

### **Summary of Schemas**
1. **Product Schema**: Manages product details, variants, and stock.
2. **Order Schema**: Tracks customer orders, payment status, and shipping details.
3. **Customer Schema**: Stores customer profiles, preferences, and order history.
4. **Category Schema**: Organizes products into categories (e.g., Athletic, Casual).
5. **Inventory Schema**: Tracks stock levels, size distribution, and restock dates.
6. **Shipment Schema**: Manages shipment tracking and delivery status.

---
