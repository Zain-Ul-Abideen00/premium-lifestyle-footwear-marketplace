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
