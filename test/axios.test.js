import axios from "axios";
import {URL, newItem, idDelete, update} from './utils'


const getItems = (url) => axios.get(url)
const saveItem = (url) => axios.post(url, newItem)
const deleteItem = (url, itemId) => axios.delete(url + itemId)
const updateItem = (url) => axios.put(url + update.id, update)

const run = () => {
  console.log('TESTS RUNNING...')

  getItems(URL)
    .then(res => console.log('productos:', res.data.data[0]))
    .catch(err => console.log(err))

  saveItem(URL)
    .then(res => console.log('item guardado', res.data))
    .catch(err => console.log(err))

  deleteItem(URL, idDelete)
    .then(res => console.log('item eliminado:', res.data))
    .catch(err => console.log(err))

  updateItem(URL)
    .then(res => console.log('item actualizado:', res.data))
    .catch(err => console.log(err))
}

run()