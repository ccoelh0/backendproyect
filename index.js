const express = require('express');
const app = express();
const Item = require('./ItemClass')
const userRoutes = require('./routes/items-routes');
const multer = require('multer')

app.use(express.json())

app.use('/api', userRoutes)

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/", upload.single('upload_file'), (req, res) => {
    let file = req.file;
    if (!file) {
        return res.status(400).send({message: "error al cargar"})
    }

    let newProduct = {
        name: req.body.name,
        price: req.body.price,
        img: req.file.path
    }
    console.log(newProduct)

    res.send('archivo guardado')
})

app.listen(8080, () => console.log('running!'));