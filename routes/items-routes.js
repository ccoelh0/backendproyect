// ROUTER 
const express = require('express');
const { Router } = express;
let router = new Router();

const methodsItem = require('../api/methods-items');

const url = '/items';

//--------------------------------------------

// router.get(url, (req, res) => {
//     methodsItem.getItems(res);
// });

// router.get(url + '/:id', (req, res) => {
//     methodsItem.getItemById(req, res);
// });

// router.delete(url + '/:id', (req, res) => {
//     methodsItem.deleteItem(req, res);
// })

// router.put(url + '/:id', (req, res) => {
//     methodsItem.editItem(req, res);
// })

//--------------------------------------------

// MULTER
const multer = require('multer')
const path = require('path');

let storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, 'upload' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

//FORM
const urlFORM = '/form'

router.get(url, (req, res) => {
    methodsItem.getStock(res)
})

router.post(urlFORM + "/crearProducto", upload.single('upload_file'), (req, res) => {
    methodsItem.saveItemByForm(req, res, `/api/${url}`)
})

module.exports = router;

