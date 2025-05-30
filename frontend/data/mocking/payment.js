export const paymentData = [
  {
    id: 1,
    restaurantName: "Sea Grill of Merrick Park",
    amount: 120.0,
    date: "2022-12-17",
    time: "12:15 PM",
    status: "Paid",
    method: "Credit Card",
    orders: [
      { name: "Grilled Salmon", price: 40.0 },
      { name: "Caesar Salad", price: 15.0 },
      { name: "Lemonade", price: 5.0 },
    ],
    vat: 10.0,
  },
  {
    id: 2,
    restaurantName: "Ocean Breeze Diner",
    amount: 85.0,
    date: "2022-12-15",
    time: "7:30 PM",
    status: "Refunded",
    method: "Paypal",
    orders: [
      { name: "Seafood Pasta", price: 35.0 },
      { name: "Garlic Bread", price: 8.0 },
      { name: "Iced Tea", price: 4.0 },
    ],
    vat: 7.0,
  },
];