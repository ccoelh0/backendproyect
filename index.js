const express = require('express');
const app = express();
const routesItem = require('./routes/items');
const routesCart = require('./routes/cart');

const path = require('path');
const stock = require('./stock.json')

//--------------------------------------------

// MILDWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname + '/public')))
app.use('/api/items', routesItem)
app.use('/api/cart', routesCart)

//--------------------------------------------

const port = process.env.PORT || 8090

app.listen(port, () => console.log(`server running in ${port}`))