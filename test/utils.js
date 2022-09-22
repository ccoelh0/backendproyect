const URL = 'http://localhost:8080/api/items/'

const newItem = {
  "name": "Attack on Titans - Vol26",
  "price": 1000,
  "image": "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/9346/9789877242324.jpg",
  "stock": 20,
  "description": "manga,,,",
  "timestamp": "23/06/2022"
}

const idDelete = '632b9989db983d138d998e3f'

const update = {
  "name": "Attack on Titans - Vol6",
  "description": "manga,,,",
  "_id": "632bae78614b9cf26c19826a",
  "price": 2000,
  "image": "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/9346/9789877242324.jpg",
  "stock": 20, 
  "timestamp": "23/06/2022",
}



export { URL, newItem, idDelete, update }