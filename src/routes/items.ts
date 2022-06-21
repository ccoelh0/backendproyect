import express from 'express'
import { getItem, saveItem, updateItem, deleteItem } from '../api/item'
import { isAdmin } from '../utils/isAdmin'

const router  = express.Router() // aplicar next()

router.get('/', (_req, res) => getItem(res, false))

router.get('/:id', (req, res) => getItem(res, req.params.id))

router.post('/', isAdmin, (req, res) => saveItem(req, res))

router.put('/:id', isAdmin, (req, res) => updateItem(req, res))

router.delete('/:id', isAdmin, (req, res) => deleteItem(res, req.params.id))
 
export {router}

