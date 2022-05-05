// ROUTER 
const express = require('express');
const { Router } = express;
const router = new Router();

const methodsItem = require('../api/methods-items');

const urlFORM = '/form'
const form = 'public/index.html'

router.get('/', (req, res) => {
    methodsItem.getForm(res, form)
})

// router.post(urlFORM + "/crearProducto", upload.single('upload_file'), (req, res) => {
//     methodsItem.saveItemByForm(req, res, `/api/${urlFORM}`)
// })

module.exports = router;

