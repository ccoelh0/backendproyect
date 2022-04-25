const ClassItem = require('../ItemClass')
const bd = 'stock.json'
const item = new ClassItem('./stock.json')

// Methods 

const getItems = (res) => item.getAll().then(response => res.send(response));

const getItemById = (req, res) => {
    item.getById(req.params.id)
        .then(r => res.send(r !== null ? r : {err: 'producto no encontrado'}));
}

const postItem = (req, res) => {
    let { name, price, img } = req.body;
    let newItem = {
        name: name, 
        price: price, 
        img: img, 
        id: bd.length !== 0 ? (bd[bd.length - 1].id) + 1 : 1
    }
    item.save(newItem).then(response => res.send(response))
};

const deleteItem = (req, res) => {
    item.deleteById(req.params.id).then(r => res.send(`
        El item con id: ${req.params.id} fue borrado.
        Stock: ${r}
    `))
}

const editItem = (req, res) => {
    const id = req.params.id;
    const newBD = bd.filter(x => parseInt(x.id, 10) !== parseInt(id, 10))
    let itemEdited = {
        id: (bd[bd.length - 1].id) + 1,
        name: req.body.name,
        price: req.body.price,
    };
    newBD.push(itemEdited)
    res.send(`El item ${itemEdited.name} fue actualizado!`)
}

module.exports = { getItems, getItemById, postItem, deleteItem, editItem };