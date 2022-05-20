const ClassItem = require('../Class/Item')
const {knex} = require('../DB/databases')
const item = new ClassItem(knex, 'items')
const time = new Date()

const getItem = (res, id) => {
    if (id) {
        return item.getById(id)
            .then(response => {
                if (response.length !== 0) return res.json({ data: response })
                return res.json({ data: 'item no encontrado' })
            })
            .catch(err => console.log(err))
    } else {
        return item.getAll()
            .then(response => {
                if (response.length !== 0) return res.json({ data: response })
                return res.json({ data: 'no hay items' })
            })
            .catch(err => console.log(err))
    }
}

const saveItem = (req, res) => {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.img,
        stock: req.body.stock,
        timestamp: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`,
        code: req.body.code
    }

    return item.save(newProduct).then(() => res.json({ data: 'guardado!' })).catch(err => console.log(err))
};

const updateItem = (req, res) => {
    const id = req.params.id

    const update = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.img,
        stock: req.body.stock,
        timestamp: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`,
        code: req.body.code
    }

    return item.editById(id, update).then(() => res.json({ data: `item ${id} actualizado!` })).catch(err => err && { err: 'ocurrio un error!' })
}

const deleteItem = (res, id) =>
    item.deleteById(id)
        .then(response => {
            if (response === 1) return res.json({ data: `item ${id} eliminado` })
            return res.json({ data: 'id no encontrado' })
        })
        .catch(err => err && { err: 'ocurrio un error!' })


module.exports = { getItem, saveItem, updateItem, deleteItem }