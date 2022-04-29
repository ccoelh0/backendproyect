const express = require('express');
const app = express();
const userRoutes = require('./routes/items-routes');
const path = require('path');
const handlebars = require('express-handlebars')

//--------------------------------------------

// MILDWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', userRoutes)
app.use(express.static(path.join(__dirname, 'public')))

//--------------------------------------------

// EJS
// app.set('views', './views');
// app.set('view engine', 'ejs');

// PUG
// app.set('views', './views');
// app.set('view engine', 'pug');

// HANDLEBARS
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//--------------------------------------------

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`server is running in ${PORT}!`)
})

server.on("error", error => console.log(`Error en servidor ${error}`));