# Day 2: Technical Foundation Planning

## **Overview**
On **Day 2**, the focus shifted to **technical planning** for the **Premium Lifestyle & Footwear Marketplace**. This document outlines the system architecture, workflows, API requirements, and Sanity schemas defined during Day 2.

---

## **Key Activities**

### **1. System Architecture**
- Designed a **high-level system architecture** using **Next.js**, **Sanity CMS**, and **third-party APIs**.
- Key components:
  - **Frontend (Next.js)**: User Interface, UI Components, Custom Hooks.
  - **Backend (Sanity CMS)**: Product Management, Order Management, Customer Data.
  - **Third-Party APIs**: Stripe (Payment), Shipping Provider (Tracking), Next-Auth (Authentication).

### **2. Key Workflows**
- **User Registration**:
  - User signs up → Data stored in Sanity → Confirmation sent.
- **Product Browsing**:
  - User views products → Sanity API fetches data → Products displayed.
- **Order Placement**:
  - User adds items to cart → Proceeds to checkout → Order saved in Sanity.
- **Shipment Tracking**:
  - Order status fetched via third-party API → Displayed to user.

### **3. API Requirements**
- Defined **API endpoints** for:
  - **Products**: Fetch all products, fetch single product, search products.
  - **Orders**: Create new order, fetch order details.
  - **Shipment**: Track order status.
  - **Users**: Register, fetch profile, update profile.

### **4. Sanity Schemas**
- Drafted schemas for:
  - **Product**: Name, Price, Category, Variants (Size, Color, Stock).
  - **Order**: OrderID, Customer, Products, Payment Status, Shipping Address.
  - **Customer**: CustomerID, Name, Email, Address, Order History.
  - **Inventory**: ProductID, Size Distribution, Color Variants, Stock Levels.
  - **Shipment**: ShipmentID, OrderID, Delivery Zone, Status.

### **5. Technical Roadmap**
- **Phase 1**: Core Features (Frontend, Sanity CMS, Stripe Integration).
- **Phase 2**: Enhanced Features (Inventory Management, Shipment Tracking).
- **Phase 3**: Optimization and Launch (Performance, SEO, Testing).

---

## **Next Steps**
- Begin **implementation** on Day 3.
- Set up **Next.js** project and integrate **Sanity CMS**.
- Implement **API endpoints** for products, orders, and users.
- Develop **frontend pages** for product browsing, cart, and checkout.
