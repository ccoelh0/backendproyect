const express = require('express');
const { Router } = express;
const router = new Router();
const methods = require('../api/form')

const form = '/public/index.html'

router.get('/', (req, res) => {
    methods.getForm(res, form)
})

module.exports = router;
