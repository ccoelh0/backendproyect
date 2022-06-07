import express from 'express'
const { Router } = express;
const router = new Router();
import { getItem, saveItem, updateItem, deleteItem } from '../daos/item.js'
import { isAdmin } from '../utils/isAdmin.js'

router.get('/', (req, res) => getItem(res, false))

router.get('/:id', (req, res) => getItem(res, req.params.id))

router.post('/', isAdmin, (req, res) => saveItem(req, res))

router.put('/:id', isAdmin, (req, res) => updateItem(req, res))

router.delete('/:id', isAdmin, (req, res) => deleteItem(res, req.params.id))
 
export {router}

