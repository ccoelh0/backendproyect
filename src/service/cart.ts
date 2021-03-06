import { cart, item } from '../daos/index'

const time = new Date()

const createNewCart = async (res) => {
	const newCart = {
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

const getCart = async (id: string|boolean, res) => {
	try {
		if (id) return res.json({ data: await cart.getById(id) })
		return res.json({data: await cart.getAll()})
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const getItemsFromCart = async (id: string, res) => {
	try {
		const cartSelected = await cart.getById(id)
		return res.json({ data: cartSelected.items })
	} catch (err) {
		return res.status(400).send({ err })
	}
}

const deleteCart = async (res, id: string) => {
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

// todo ready
export { createNewCart, getCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart }