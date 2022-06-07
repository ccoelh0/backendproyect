import Cart from "../daos/cart/CartDaoMongo.js"
const cart = new Cart()
const time = new Date()

const createNewCart = (res) => { 
    const newCart = {
        timestamp: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`,
        items: []
    }
    cart.save(newCart)
        .then(response => res.json(response))
        .catch(err => err && { err: 'ocurrio un error!' }) 
}

const deleteCart = (res, id) =>
    cart.deleteById(id)
        .then(response => {
            if (response !== null) return res.json({data: `cart con id ${response.id} eliminado`})
            if (response === null) return res.json({data: 'id no encontrado'})
        })
        .catch(err => err && { err: 'ocurrio un error!' })

//probar con items
const getItemsFromCart = (id, res) =>
    cart.getById(id).then(response => res.json(response.items)).catch(err => err && { err: 'ocurrio un error!' })


const addItemsToCart = (req, res) => {
    const idCart = req.params.id
    const idItem = req.params.idItem
    cart.editById(idCart, idItem).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })
}

const deleteItemFromCart = (req, res) => {
    const idCart = req.params.id
    const idProd = req.params.idProducto
    cart.deleteItemFromCart(idCart, idProd).then(response => res.send(response)).catch(err => err && { err: 'ocurrio un error!' })
}

export {createNewCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart}