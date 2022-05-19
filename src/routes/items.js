const express = require('express');
const { Router } = express;
const router = new Router();
const methods = require('../api/item');
const isAdmin = require('../api/isAdmin')

router.get('/', (req, res) => methods.getItem(res, false))

router.get('/:id', (req, res) => methods.getItem(res, req.params.id))

router.post('/', isAdmin, (req, res) => methods.saveItem(req, res))

router.put('/:id', isAdmin, (req, res) => methods.updateItem(req, res))

router.delete('/:id', isAdmin, (req, res) => methods.deleteItem(res, req.params.id))

module.exports = router;

