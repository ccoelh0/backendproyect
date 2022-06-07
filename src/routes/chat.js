const express = require('express');
const { Router } = express;
const router = new Router();
const methods = require('../containers/chat')

const form = '/public/index.html'

router.get('/', (req, res) => {
    methods.getForm(res, form)
});

router.post('/', (req, res) => {
    methods.saveMsjByChat(req, res)
});

router.get('/all', (req, res) => {
    methods.getAll(req, res)
})

module.exports = router;
