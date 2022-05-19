const knex = require('knex')({
  client: 'mysql',
  connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      database: 'mangabd'
  },
  pool: { min: 2, max: 8 }
});

knex.schema.createTableIfNotExists('items', (table) => {
  table.increments('id').primary()
  table.string('name'),
  table.string('description')
  table.integer('price')
  table.string('image')
  table.integer('stock')
  table.time('timestamp')
  table.integer('code')
})
// .then(() => console.log('tabla creada'))
// .catch(err => console.log(err))

module.exports = knex;