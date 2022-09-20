import axios from "axios";

const URL = 'http://localhost:8080/api/items/'
const newItem = {
  "name": "Attack on Titans - Vol26",
  "price": 1000,
  "image": "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/9346/9789877242324.jpg",
  "stock": 20,
  "description": "manga,,,",
  "timestamp": "23/06/2022"
}
const idDelete = '62b4fb31fd42fa6d93f71291'
const update = {
  "name": "Attack on Titans - Vol1",
  "id": "63200b00370cc76cdf9a1191",
  "price": 1000,
  "image": "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/9346/9789877242324.jpg",
  "stock": 20
}

const getItems = (url) => axios.get(url)
const saveItem = (url) => axios.post(url, { newItem })
const deleteItem = (url, itemId) => axios.delete(url + itemId)
const updateItem = (url) => axios.put(url + update.id, update)

const run = () => {
  getItems(URL)
    .then(res => console.log(res))
    .catch(err => console.log(err))

  saveItem(URL)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

  deleteItem(URL, idDelete)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

  updateItem(URL)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

run()