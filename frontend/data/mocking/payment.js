export const paymentData = [
  {
    id: "pay1",
    restaurantName: "Sea Grill of Merrick Park",
    restaurantID: "rest1",
    restaurantLogoImg: "https://picsum.photos/200",
    amount: 120.0,
    date: "2022-12-17",
    time: "12:15 PM",
    status: "Paid",
    method: "Credit Card",
    orders: [
      { 
        id: "f001",
        name: "Grilled Salmon", 
        price: 40.0, 
        quantity: 2
      },
      { 
        id: "f002",
        name: "Caesar Salad", 
        price: 15.0, 
        quantity: 1
      },
      { 
        id: "f003",
        name: "Lemonade", 
        price: 5.0, 
        quantity: 3
      },
    ],
    vat: 10.0,
  },
  {
    id: "pay2",
    restaurantName: "Ocean Breeze Diner",
    restaurantID: "rest2",
    restaurantLogoImg: "https://picsum.photos/200",
    amount: 85.0,
    date: "2022-12-15",
    time: "7:30 PM",
    status: "Refunded",
    method: "Paypal",
    orders: [
      { 
        id: "f004",
        name: "Seafood Pasta", 
        price: 35.0, 
        quantity: 1
      },
      { 
        id: "f005",
        name: "Garlic Bread", 
        price: 8.0, 
        quantity: 2
      },
      { 
        id: "f006",
        name: "Iced Tea", 
        price: 4.0, 
        quantity: 2
      },
    ],
    vat: 7.0,
  },
];
