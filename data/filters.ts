// data/filters.ts
export const getFiltersForCategory = (categoryId: string) => {
  const commonFilters = {
    price: {
      id: 'price',
      name: 'Price',
      type: 'range',
      options: []
    },
    rating: {
      id: 'rating',
      name: 'Rating',
      type: 'checkbox',
      options: [
        { id: '4', label: '4 & above', count: 120 },
        { id: '3', label: '3 & above', count: 85 },
        { id: '2', label: '2 & above', count: 45 }
      ]
    }
  };

  const categorySpecificFilters: Record<string, any> = {
    electronics: [
      {
        id: 'brand',
        name: 'Brand',
        type: 'checkbox',
        options: [
          { id: 'apple', label: 'Apple', count: 45 },
          { id: 'samsung', label: 'Samsung', count: 38 },
          { id: 'sony', label: 'Sony', count: 25 }
        ]
      },
      {
        id: 'features',
        name: 'Features',
        type: 'checkbox',
        options: [
          { id: 'wireless', label: 'Wireless', count: 68 },
          { id: 'bluetooth', label: 'Bluetooth', count: 72 }
        ]
      },
      commonFilters.price,
      commonFilters.rating
    ],
    clothing: [
      {
        id: 'size',
        name: 'Size',
        type: 'checkbox',
        options: [
          { id: 's', label: 'Small', count: 45 },
          { id: 'm', label: 'Medium', count: 68 },
          { id: 'l', label: 'Large', count: 42 }
        ]
      },
      {
        id: 'color',
        name: 'Color',
        type: 'checkbox',
        options: [
          { id: 'black', label: 'Black', count: 58 },
          { id: 'blue', label: 'Blue', count: 42 },
          { id: 'white', label: 'White', count: 35 }
        ]
      },
      commonFilters.price,
      commonFilters.rating
    ],
    // Add more categories as needed
  };

  return categorySpecificFilters[categoryId] || [
    commonFilters.price,
    commonFilters.rating
  ];
};