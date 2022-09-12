import { cart, item, session } from '../daos/index.js'
import {transporter, emailOptionsConfirmPurchase, sendWp, sendMsg} from '../utils/contact.js'
import logger from '../utils/logger.js'

const time = new Date()

const createNewCart = async (req, res) => {
	const newCart = {
		email: req.body.email,
		timestamp: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
		items: []
	}

	try {
		const created = await cart.save(newCart)
		return res.json({ data: created })
	} catch (err) {
		return res.status(400).send({ err: 'Bad request' });
	}
}

const getCart = async (req, res) => {
	try {
		if (req.params.id) return res.json({ data: await cart.getById(req.params.id) })
		return res.json({data: await cart.getAll()})
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const getItemsFromCart = async (id, res) => {
	try {
		const cartSelected = await cart.getById(id)
		return res.json({ data: cartSelected.items })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const deleteCart = async (req, res) => {
	const id = req.params.id
	try {
		await cart.deleteById(id)
		return res.json({ data: `cart ${id} eliminada` })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const addItemsToCart = async (req, res) => {
	const cartId = req.params.id
	const itemData = await item.getById(req.params.idItem)
	const cartData = await cart.getById(cartId)
	cartData.items.push(itemData)

	try {
		await cart.updateById(cartId, {items: cartData.items})
		return res.json({ data: `${itemData._id} aniadido!` })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const deleteItemFromCart = async (req, res) => {
	const id = req.params.id
	const idItem = req.params.idItem
	const cartSelected = await cart.getById(id)
	const filter = cartSelected.items.filter(x => x._id.valueOf() !== idItem)

	try {
		await cart.updateById(id, {items: filter})
		return res.json({ data: `${idItem} eliminado` })
	} catch (err) {
		return res.status(400).send({err})
	}
}

const getUserPhone = async (email) => {
	const data = await session.getAll()
	const res = await data
	return res.find(dato => dato.email === email).phone
}

const buyCart = async (req, res) => {
	const phoneBuyer = await getUserPhone(req.body.cart.email)
	try {
    await transporter.sendMail(emailOptionsConfirmPurchase(req.body.cart))
		await sendWp(req.body.cart)
		await sendMsg(req.body.cart, phoneBuyer)
    return res.send({purchaseFinished: true})
  } catch (err) {
		logger.error(err)
    return res.send({purchaseFinished: false, err})
  }
} 

export { createNewCart, getCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart, buyCart }