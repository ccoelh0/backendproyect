const ClassItem = require('../ItemClass')
const item = new ClassItem('./stock.json')

// ITEMS

const getItem = (res, id) => {
    if (id) {
        item.getById(id).then(response => res.send(response))
    } else {
        item.getAll().then(response => res.send(response))
    }
}

const saveItem = (req, res, isAdmin) => {
    if (isAdmin) {
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            img: req.body.img
        }
    
        item.save(newProduct).then(response => res.send(response))
    } else {
        res.send('ups, no tenes acceso a esta seccion :)')
    }
};

const updateItem = (req, res, id, isAdmin) => {
    if (isAdmin) {
        const update = {
            name: req.body.name,
            price: req.body.price,
            img: req.body.img
        }

        item.editById(id, update).then(response => res.send(response))
    } else{
        res.send('ups, no tenes acceso a esta seccion :)')
    }
}

const deleteItem = (res, id, isAdmin) => {
    if (isAdmin) item.deleteById(id).then(response => res.send(response))
    else res.send('ups, no tenes acceso a esta seccion :)')
    
}

// CART



module.exports = { getItem, saveItem, updateItem, deleteItem }

// //--------------------------------------------

// // Methods 

// // const getItems = (res) => item.getAll().then(response => res.send(response));

// // const getItemById = (req, res) => {
// //     item.getById(req.params.id)
// //         .then(r => res.send(r !== null ? r : {err: 'producto no encontrado'}));
// // }

// // const deleteItem = (req, res) => {
// //     item.deleteById(req.params.id).then(r => res.send(`
// //         El item con id: ${req.params.id} fue borrado.
// //         Stock: ${r}
// //     `))
// // }

// // const editItem = (req, res) => item.editById(req.params.id, req.body).then(r => res.send(r))

// //--------------------------------------------

// // FORM

// // const getStock = (res) => item.getAll().then(response => res.render('items', { data: response }))

// // const saveItemByForm = (req, res, url) => {
// //     let file = req.file;
// //     if (!file) {
// //         return res.status(400).send({ message: "error al cargar" })
// //     }

// //     let newProduct = {
// //         name: req.body.name,
// //         price: req.body.price,
// //         img: req.file.path
// //     }

// //     item.save(newProduct).then(r => console.log(r))
// //     res.redirect(url)
// // };

// //--------------------------------------------

// const getForm = (res, url) => res.sendFile(url, {root: '.'});

// const saveItemByWS = object => {
//     item.save(object).then(res => console.log(res))
// }

// module.exports = { getForm, saveItemByWS };