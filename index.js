const express = require('express');
const app = express();
const path = require('path');

const routesItem = require('./routes/items');
const routesCart = require('./routes/cart');

//--------------------------------------------

// MILDWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname + '/public')))
app.use('/api/items', routesItem)
app.use('/api/cart', routesCart)

//--------------------------------------------

const port = process.env.PORT || 8090

app.listen(port, () => console.log(`Server is running in ${port}!`))