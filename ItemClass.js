const fs = require('fs');

class Item {
    constructor(path) {
        this.path = path;
    }

    async save(object) {
        const item = await new Promise((resolve, reject) => {
            return fs.readFile(`./${this.path}`, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                }
                const array = JSON.parse(data);
                const obj = { ...object, id: array.length !== 0 ? array[array.length - 1].id + 1 : 1 };
                array.push(obj)
                fs.writeFile(`./${this.path}`, JSON.stringify(array, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(obj);
            })
        })
        return item;
    }

    async getById(id) {
        const item = await new Promise((resolve, reject) => {
            return fs.readFile(`./${this.path}`, 'utf-8', (err, data) => {
                if (err) return reject(err);

                const array = JSON.parse(data);
                const find = array.find(x => x.id === parseInt(id, 10))
                return resolve(find !== undefined ? find : null)
            })
        })
        return item;
    }

    async getAll() {
        const fileContent = await new Promise((resolve, reject) => {
            return fs.readFile(`./${this.path}`, 'utf-8', (err, data) => {
                if (err) reject(err);
                return resolve(JSON.parse(data));
            })
        })
        return fileContent;
    }

    async deleteById(id) {
        const item = await new Promise((resolve, reject) => {
            return fs.readFile(`./${this.path}`, 'utf-8', (err, data) => {
                if (err) return reject(err);

                const array = JSON.parse(data);
                const newArray = array.filter(a => a.id !== parseInt(id, 10))
                fs.writeFile(`./${this.path}`, JSON.stringify(newArray, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(newArray);
            })
        })
        return item;
    }

    async getRandom() {
        const fileContent = await new Promise((resolve, reject) => {
            return fs.readFile(`./${this.path}`, 'utf-8', (err, data) => {
                if (err) reject(err);
                return resolve(JSON.parse(data));
            })
        })
        const randomPosition = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        return fileContent[randomPosition(0, 3)];
    }

    async editById(id, object) {
        const itemEdited = await new Promise((resolve, reject) => {
            return fs.readFile(`./${this.path}`, 'utf-8', (err, data) => {
                if (err) return reject(err);

                const array = JSON.parse(data);
                const newArray = array.filter(x => x.id !== parseInt(id, 10))
                const itemEdited = {
                    id: parseInt(id, 10),
                    name: object.name,
                    price: object.price,
                    img: object.img
                };
                newArray.push(itemEdited)
                fs.writeFile(`./${this.path}`, JSON.stringify(newArray, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(itemEdited)
            })
        })
        return itemEdited;
    }
}

module.exports = Item;
