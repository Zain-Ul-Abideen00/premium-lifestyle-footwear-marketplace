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
