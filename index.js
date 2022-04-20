const express = require('express');
const app = express();
const Item = require('./ItemClass')
const userRoutes = require('./routes/items-routes');

// Leer JSONs
app.use(express.json())

app.use('/api', userRoutes)

app.listen(8080, () => console.log('running!'));