const express = require('express');
const {Router} = express;
let router = new Router(); 

let items = [
    {
        "name": "billetera",
        "price": 125,
        "img": null,
        "id": 1
    },
    {
        "name": "cartera",
        "price": 100,
        "img": null,
        "id": 2
    },
]

const api = '/productos';

router.get(api, (req, res) => {
    res.send(items)
});

router.get(api + '/:id', (req, res) => {
    const id = req.params.id;
    const itemToShow = items.filter(i => parseInt(i.id, 10) === parseInt(id, 10));
    itemToShow.length !== 0 ? res.send(itemToShow) : res.send({err: 'producto no encontrado'});
});

router.post(api, (req, res) => {
    let {name, price, img} = req.body;
    let newItem = {
        name: name, 
        price: price, 
        img: img, 
        id: (items[items.length - 1].id) + 1
    }
    items.push(newItem)
    res.send(`Item ${name} creado, su id es ${(items[items.length - 1].id) + 1}!`)  
})

router.delete(api + '/:id', (req, res) => {
    const id = req.params.id;
    const itemToShow = items.filter(i => parseInt(i.id, 10) !== parseInt(id, 10)) 
    res.send(itemToShow)
})

module.exports = router;

