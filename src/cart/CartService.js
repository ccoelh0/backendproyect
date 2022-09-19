import CartFactory from './CartFactory.js'
import { transporter, emailOptionsConfirmPurchase, sendWp, sendMsg } from '../utils/contact.js'
import logger from '../utils/logger.js'
import CartDTO from './CartDTO.js'
import config from '../utils/config.js'
import ItemController from '../item/ItemController.js'

const cart = CartFactory.create(config.mongobd.persistence)
const item = new ItemController()

const createNewCart = async (newCart, res) => {
	try {
		const created = await cart.save(newCart)
		const newCartDTO = new CartDTO(created)
		return res.json({ data: newCartDTO })
	} catch (err) {
		return res.status(400).send({ err: 'Bad request' });
	}
}

const getCart = async (id, res) => {
	try {
		if (id) {
			const data = await cart.getById(id)
			const cartDTO = new CartDTO(data)
			return res.json({ data: cartDTO })
		}
		const data = await cart.getAll()
		const cartsDTO = data.map(x => new CartDTO(x))
		return res.json({ data: cartsDTO })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const getItemsFromCart = async (id, res) => {
	try {
		const cartSelected = await cart.getById(id)
		const itemsFromCartDTO = new CartDTO(cartSelected).items
		return res.json({ data: itemsFromCartDTO })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const deleteCart = async (id, res) => {
	try {
		await cart.deleteById(id)
		return res.json({ data: `cart ${id} eliminada` })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const addItemsToCart = async (cartId, itemId, res) => {
	const itemData = await item.getItem(itemId)
	const cartData = await cart.getById(cartId)
	cartData.items.push(itemData)

	try {
		await cart.updateById(cartId, { items: cartData.items })
		return res.json({ data: `${itemData._id} aniadido!` })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const deleteItemFromCart = async (cartId, itemId, res) => {
	const cartSelected = await cart.getById(cartId)
	const filter = cartSelected.items.filter(x => x._id.valueOf() !== itemId)

	try {
		await cart.updateById(cartId, { items: filter })
		return res.json({ data: `${itemId} eliminado` })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const getUserPhone = async (email) => {
	const data = await session.getAll()
	const res = await data
	return res.find(dato => dato.email === email).phone
}

const buyCart = async (cart, res) => {
	const phoneBuyer = await getUserPhone(cart.email)
	try {
		await transporter.sendMail(emailOptionsConfirmPurchase(cart))
		await sendWp(cart)
		await sendMsg(cart, phoneBuyer)
		return res.send({ purchaseFinished: true })
	} catch (err) {
		logger.error(err)
		return res.send({ purchaseFinished: false, err })
	}
}

export { createNewCart, getCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart, buyCart }
