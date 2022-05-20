class Chat {
    constructor(knex, bdName) {
        this.knex = knex;
        this.bdName = bdName;
    }

    save(msj) {
        return this.knex(this.bdName).insert(msj)
    }

    getAll() {
        return this.knex(this.bdName).select('*')
    }
}

module.exports = Chat;