class Item {
    constructor(knex, bdName) {
        this.knex = knex;
        this.bdName = bdName;
    }

    save(object) {
        return this.knex(this.bdName).insert(object)
    }

    getById(id) {
        return this.knex(this.bdName).select('*').where({id: id});
    }

    getAll() {
        return this.knex.from(this.bdName).select('*')
    }

    deleteById(id) {
        return this.knex(this.bdName).where({id: id}).del()    
    }

    editById(id, object) {
        return this.knex(this.bdName).where({id: id}).update(object)
    }
}

module.exports = Item;
