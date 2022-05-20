
// const cart = new Cart('./carts.json')

// const createNewCart = (res) => { 
//     cart.createNewCart()
//         .then(response => res.json(response))
//         .catch(err => err && { err: 'ocurrio un error!' }) 
// }

// const deleteCart = (res, id) =>
//     cart.deleteCartById(id).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })

// const getItemsFromCart = (id, res) =>
//     cart.getItemsFromCart(id).then(response => res.json(response)).catch(err => err && { err: 'ocurrio un error!' })


// const addItemsToCart = (req, res) => {
//     const idCart = req.params.id
//     const idProd = req.params.idProducto
//     cart.addItemsToCart(idCart, idProd).then(response => res.send('item agregado!')).catch(err => err && { err: 'ocurrio un error!' })
// }

// const deleteItemFromCart = (req, res) => {
//     const idCart = req.params.id
//     const idProd = req.params.idProducto
//     cart.deleteItemFromCart(idCart, idProd).then(response => res.send(response)).catch(err => err && { err: 'ocurrio un error!' })
// }

// module.exports = {createNewCart, deleteCart, getItemsFromCart, addItemsToCart, deleteItemFromCart}