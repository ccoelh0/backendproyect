import {cart, item} from '../daos/index.js'
const time = new Date()

const createNewCart = async (res) => { 
    const newCart = {
        timestamp: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
        items: []
    }
    const created = await cart.save(newCart)
    res.json(created)
}

const getItemsFromCart = async (id, res) => {
    const cartSelected = await cart.getById(id)
    res.json({data: cartSelected.items})
}

const deleteCart = async (res, id) => {
    await cart.deleteById(id)
    res.json({data: `cart ${id} eliminada`})
}

const addItemsToCart = async (req, res) => {
    const cartId = req.params.id
    const itemData = await item.getById(req.params.idItem)
    const cartData = await cart.getById(cartId)
    cartData.items.push(itemData)
    await cart.updateById(cartId, cartData.items)
    res.json({data: 'item agregado!'})
}

const deleteItemFromCart = async (req, res) => {
    const id = req.params.id
    const idItem = req.params.idItem
    const cartSelected = await cart.getById(id)
    const filter = cartSelected.items.filter(x => x.id !== idItem)
    await cart.updateById(id, filter)
    res.json({data: `item ${idItem} eliminado`})
}

export { createNewCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart }