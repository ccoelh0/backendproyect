const express = require('express');
// Bodyparser > para capturar el contenido del form 
const bodyParser = require('body-parser')
const app = express();
const userRoutes = require('./routes/items-routes');
const multer = require('multer')
const path = require('path');

app.use(express.json())
// Para capturar contenido del form
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api', userRoutes)

let storage = multer.diskStorage({
    destination: path.resolve(__dirname, './public/images'), 
    filename: (req, file, cb) => {
        cb(null, 'upload' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

// Esto lo hice aca porque no sabia si la forma en la que arme los otros metodos estaba bien
const ClassItem = require('./ItemClass')
const bd = 'stock.json'
const item = new ClassItem('./stock.json')

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

    item.save(newProduct).then(r => console.log(r))
    res.send('guardado!')

})

app.listen(8080, () => console.log('server is running!'));