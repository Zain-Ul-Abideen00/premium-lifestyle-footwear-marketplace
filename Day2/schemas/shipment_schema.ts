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
