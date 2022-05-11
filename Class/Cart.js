const fs = require('fs');

class Cart {
    constructor(path) {
        this.path = path;
        this.stock = require('../stock.json')
    }

    async createNewCart() {
        const newCart = await new Promise((resolve, reject) => {
            return fs.readFile(`${this.path}`, 'utf-8', (err, data) => {
                if (err) reject(err)
                const array = JSON.parse(data)
                const time = new Date()

                const newCart = {
                    id: array.length !== 0 ? array[array.length - 1].id + 1 : 1,
                    timestamp: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()} || ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                    productos: []
                }
                array.push(newCart)
                fs.writeFile(`${this.path}`, JSON.stringify(array, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(newCart)
            })
        })
        return newCart;
    }

    async deleteCartById(id) {
        const newCart = await new Promise((resolve, reject) => {
            return fs.readFile(`${this.path}`, 'utf-8', (err, data) => {
                if (err) return reject(err);

                const array = JSON.parse(data);
                const newArray = array.filter(a => a.id !== parseInt(id, 10))
                fs.writeFile(`${this.path}`, JSON.stringify(newArray, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(newArray);
            })
        })
        return newCart;
    }

    async getItemsFromCart (id) {
        const items = await new Promise((resolve, reject) => {
            return fs.readFile(`${this.path}`, 'utf-8', (err, data) => {
                if (err) return reject(err)

                const array = JSON.parse(data)
                const cart = array.filter(a => a.id === parseInt(id, 10))
                const itemsFromCart = cart[0].productos
                return resolve(itemsFromCart)
            })
        }) 
        return items;
    }

    async addItemsToCart (idCart, idProd) {
        const item = await new Promise((resolve, reject) => {
            return fs.readFile(`${this.path}`, 'utf-8', (err, data) => {
                if (err) return reject(err)

                const array = JSON.parse(data)
                const prod = this.stock.find(x => x.id === parseInt(idProd, 10))
                const cart = array.find(a => a.id === parseInt(idCart, 10))
                cart.productos.push(prod)

                let newArray = array.filter(a => a.id !== parseInt(idCart, 10))
                newArray.push(cart)

                fs.writeFile(`${this.path}`, JSON.stringify(newArray, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(cart)
            })
        })
        return item;
    }

    async deleteItemFromCart (idCart, idProd) {
        const item = await new Promise((resolve, reject) => {
            return fs.readFile(`${this.path}`, 'utf-8', (err, data) => {
                if (err) return reject(err)

                const array = JSON.parse(data)
                let cart = array.find(a => a.id === parseInt(idCart, 10))
                const newCart = cart.productos.filter(x => x.id !== parseInt(idProd, 10))
                cart.productos = newCart;

                let newArray = array.filter(x => x.id !== parseInt(idCart, 10))
                newArray.push(cart)

                fs.writeFile(`${this.path}`, JSON.stringify(newArray, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(cart)
            })
        })
        return item;
    }
}

module.exports = Cart;