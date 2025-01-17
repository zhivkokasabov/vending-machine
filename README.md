This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Follow these steps to run the project locally:

1. Navigate to the `api` folder and run the mock api:

   ```cmd
   cd api
   npm install
   npm run start

2. Navigate to the root folder an run the app:

   ```cmd
   npm install
   npm run build
   npm run start

3. Open your browser and go to
  http://localhost:3000

## Accepted denominations
  - 0.01
  - 0.02
  - 0.05
  - 0.10
  - 0.20
  - 0.50
  - 1.00
  - 2.00

For simplicity the app provides a random denomination generator button. It will generate a number between 2.01 and 2.99

## Note for developers
- Inventory size – up to 15 products of the same type
- Price of products – should be different for each type
- Use a currency of your choice, but please note the accepted coin denominations in a
readme file. Make sure your vending machine accepts only the selected denominations
- The machine must return change
- Web Design: responsive

Operations to be implemented:

- Products - Get initial products list data from external resource (mocked API created by
you)
- CRUD operations for the products only in the application state (products data is not
needed to be updated in the external resource)
- Vending – Insert coins, buy product, reset process (return the coins without purchase)
