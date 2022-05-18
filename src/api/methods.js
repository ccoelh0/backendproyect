const ClassItem = require('../Class/Item')
const Cart = require('../Class/Cart')

//--------------------------------------------------------

const item = new ClassItem('./stock.json')

const getItem = (res, id) => {
    if (id) {
        item.getById(id).then(response => res.json(response)).catch(err => console.log(err))
    } else {
        item.getAll().then(response => res.json(response)).catch(err => console.log(err))
    }
}

const saveItem = (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        description: req.body.description,
        stock: req.body.stock
    }

    item.save(newProduct).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })
};

const updateItem = (req, res) => {
    const update = {
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        description: req.body.description,
        stock: req.body.stock
    }

    item.editById(req.params.id, update).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })
}

const deleteItem = (res, id) => item.deleteById(id).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })


//--------------------------------------------------------

const cart = new Cart('./carts.json')

const createNewCart = (res) => { 
    cart.createNewCart()
        .then(response => res.json(response))
        .catch(err => err && { err: 'ocurrio un error!' }) 
}

const deleteCart = (res, id) =>
    cart.deleteCartById(id).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })

const getItemsFromCart = (id, res) =>
    cart.getItemsFromCart(id).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })


const addItemsToCart = (req, res) => {
    const idCart = req.params.id
    const idProd = req.params.idProducto
    cart.addItemsToCart(idCart, idProd).then(response => res.send('item agregado!')).catch(err => err && { err: 'ocurrio un error!' })
}

const deleteItemFromCart = (req, res) => {
    const idCart = req.params.id
    const idProd = req.params.idProducto
    cart.deleteItemFromCart(idCart, idProd).then(response => res.send(response)).catch(err => err && { err: 'ocurrio un error!' })
}

module.exports = { getItem, saveItem, updateItem, deleteItem, createNewCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart }