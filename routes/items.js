const express = require('express');
const { Router } = express;
const router = new Router();
const methods = require('../api/methods');

router.get('/', (req, res) => {
    methods.getItem(res, false)
})

router.get('/:id', (req, res) => {
    methods.getItem(res, req.params.id)
})

router.post('/', (req, res) => {
    const isAdmin = req.query.admin
    methods.saveItem(req, res, isAdmin)
})

router.put('/:id', (req, res) => {
    const isAdmin = req.query.admin
    const id = req.params.id
    methods.updateItem(req, res, id, isAdmin)
})

router.delete('/:id', (req, res) => {
    const isAdmin = req.query.admin
    const id = req.params.id
    methods.deleteItem(res, id, isAdmin)
})

module.exports = router;

