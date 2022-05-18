class Chat {
    constructor() {
        this.path = './messages.json'
    }

    async save(msj) {
        const data = new Promise((resolve, reject) => {
            return fs.readFile(`${this.path}`, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                }
                const array = JSON.parse(data);
                const obj = { ...msj, id: array.length !== 0 ? array[array.length - 1].id + 1 : 1 };
                array.push(obj)
                fs.writeFile(`${this.path}`, JSON.stringify(array, null, 2), 'utf-8', (err) => err && console.log(err));
                return resolve(array);
            })
        })
        return data;
    }
}

module.exports = Chat;