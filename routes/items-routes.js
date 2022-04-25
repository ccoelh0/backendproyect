// ROUTER 
// Here only routes

const express = require('express');
const {Router} = express;
let router = new Router(); 

// Methods from items.js
const methodsItem = require('../api/items');

const url = '/items';

router.get(url, (req, res) => {
    methodsItem.getItems(res);
});

router.get(url + '/:id', (req, res) => {
    methodsItem.getItemById(req, res);
});

router.post(url, (req, res) => {
    methodsItem.postItem(req, res);
})

router.delete(url + '/:id', (req, res) => {
    methodsItem.deleteItem(req, res);
})

router.put(url + '/edit/:id', (req, res) => {
    methodsItem.editItem(req, res)
})

module.exports = router;

