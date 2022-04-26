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

const editItem = (req, res) => item.editById(req.params.id, req.body).then(r => res.send(r))


module.exports = { getItems, getItemById, postItem, deleteItem, editItem };