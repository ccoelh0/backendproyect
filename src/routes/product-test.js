import express from 'express'
import { faker } from '@faker-js/faker';

let items = [] 

const getItems = () => {
  for (let i = 0; i < 5; i++) {
    items.push({
      name: faker.vehicle.vehicle(),
      price: faker.commerce.price(1000, 10000),
      model: faker.vehicle.model()
    })
}}

const router = express.Router() 

router.get('/', (_, res) => {
  getItems()
  res.json(items)
  items = []
})

export {router}; 