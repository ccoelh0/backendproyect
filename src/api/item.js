import Item from '../daos/item/ItemDaoMongo.js'
const item = new Item()
const time = new Date()

const getItem = async (res, id) => {
    if (id) {
        const find = await item.getById(id)
        res.json({ data: find })
    } else {
        const find = await item.getAll()
        res.json({data: find})
    }
}

const saveItem = async (req, res) => {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        stock: req.body.stock,
        timestamp: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`,
    }

    try {
        await item.save(newProduct)
        return res.json({ data: 'guardado!' })
    } catch (err) {
        return console.log(err)
    }
};

const updateItem = async (req, res) => {
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

    await item.updateById(id, update)
    res.json({data: `${id} actualizado`})
}

const deleteItem = async (res, id) => {
   try {
        await item.deleteById(id)
        res.json({data: `${id} eliminado`})
   } catch (err) {
       res.json({data: err})
    }
}

export { getItem, saveItem, updateItem, deleteItem }