const express = require('express');
const app = express();
const port = 3001;

const products = [
  {
    "id": 1,
    "name": "Soda Can",
    "stock": 1,
    "image": "https://picsum.photos/600/300?text=Soda+Can",
    "code": "001",
    "price": 1.25
  },
  {
    "id": 2,
    "name": "Chips Pack",
    "stock": 12,
    "image": "https://picsum.photos/600/300?text=Chips+Pack",
    "code": "002",
    "price": 1.50
  },
  {
    "id": 3,
    "name": "Candy Bar",
    "stock": 5,
    "image": "https://picsum.photos/600/300?text=Candy+Bar",
    "code": "003",
    "price": 0.99
  },
  {
    "id": 4,
    "name": "Water Bottle",
    "stock": 15,
    "image": "https://picsum.photos/600/300?text=Water+Bottle",
    "code": "004",
    "price": 1.00
  },
  {
    "id": 5,
    "name": "Gum Pack",
    "stock": 8,
    "image": "https://picsum.photos/600/300?text=Gum+Pack",
    "code": "005",
    "price": 0.75
  },
  {
    "id": 6,
    "name": "Juice Box",
    "stock": 7,
    "image": "https://picsum.photos/600/300?text=Juice+Box",
    "code": "006",
    "price": 1.60
  },
  {
    "id": 7,
    "name": "Granola Bar",
    "stock": 14,
    "image": "https://picsum.photos/600/300?text=Granola+Bar",
    "code": "007",
    "price": 1.20
  },
  {
    "id": 8,
    "name": "Energy Drink",
    "stock": 6,
    "image": "https://picsum.photos/600/300?text=Energy+Drink",
    "code": "008",
    "price": 2.00
  },
  {
    "id": 9,
    "name": "Muffin",
    "stock": 9,
    "image": "https://picsum.photos/600/300?text=Muffin",
    "code": "009",
    "price": 1.80
  },
  {
    "id": 10,
    "name": "Pretzels",
    "stock": 10,
    "image": "https://picsum.photos/600/300?text=Pretzels",
    "code": "010",
    "price": 1.30
  },
  {
    "id": 11,
    "name": "Cookies",
    "stock": 13,
    "image": "https://picsum.photos/600/300?text=Cookies",
    "code": "011",
    "price": 1.40
  },
  {
    "id": 12,
    "name": "Nuts Mix",
    "stock": 4,
    "image": "https://picsum.photos/600/300?text=Nuts+Mix",
    "code": "012",
    "price": 2.10
  },
  {
    "id": 13,
    "name": "Fruit Snack",
    "stock": 8,
    "image": "https://picsum.photos/600/300?text=Fruit+Snack",
    "code": "013",
    "price": 1.90
  },
  {
    "id": 14,
    "name": "Crisps",
    "stock": 6,
    "image": "https://picsum.photos/600/300?text=Crisps",
    "code": "014",
    "price": 1.70
  },
  {
    "id": 15,
    "name": "Chocolate Milk",
    "stock": 10,
    "image": "https://picsum.photos/600/300?text=Chocolate+Milk",
    "code": "015",
    "price": 2.20
  },
  {
    "id": 16,
    "name": "Peanut Butter Cups",
    "stock": 5,
    "image": "https://picsum.photos/600/300?text=Peanut+Butter+Cups",
    "code": "016",
    "price": 1.50
  }
];

app.get('/products', (_, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Mock API is running at http://localhost:${port}`);
});