const fs = require('fs');

class Item {
    constructor(path) {
        this.path = path;
    }

    save(object) {
        fs.promises.readFile(`./${this.path}`, 'utf-8')
            .then(data => {
                const array = JSON.parse(data);
                const obj = { ...object, id: array.length + 1 };
                array.push(obj)
                fs.writeFile(`./${this.path}`, JSON.stringify(array, null, 2), 'utf-8', (err) => err && console.log(err));
                console.log(obj.id)
                return obj.id;
            })
            .catch(err => {
                if (err) {
                    const obj = { ...object, id: 1 };
                    fs.writeFile(`./${this.path}`, JSON.stringify([obj], null, 2), 'utf-8', err => err && console.log(err))
                    console.log(obj.id)
                    return obj.id;
                }
            })
    }

    getById(id) {
        fs.promises.readFile(`./${this.path}`, 'utf-8')
            .then(data => {
                const array = JSON.parse(data);
                const find = array.find(a => a.id === id)
                console.log(find !== undefined ? find : null)
                return find !== undefined ? find : null
            })
            .catch(err => console.log(err))
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

    deleteById(id) {
        fs.promises.readFile(`./${this.path}`, 'utf-8')
            .then(data => {
                const array = JSON.parse(data);
                const find = array.filter(a => a.id !== id)
                fs.writeFile(`./${this.path}`, JSON.stringify(find, null, 2), 'utf-8', (err) => err && console.log(err));

            })
            .catch(err => console.log(err))
    }

    deleteAll() {
        fs.promises.unlink(`./${this.path}`)
            .then(data => data)
            .catch(err => err)
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
}

module.exports = Item; 
