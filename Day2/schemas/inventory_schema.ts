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
