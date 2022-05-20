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

knex.schema.hasTable('items').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('items', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('price').notNullable();
      table.string('image');
      table.integer('stock');
      table.time('timestamp');
      table.integer('code');
    });
  }
});

// knex.schema.createTableIfNotExists('items', (table) => {
//   table.increments('id').primary()
//   table.string('name'),
//   table.string('description')
//   table.integer('price')
//   table.string('image')
//   table.integer('stock')
//   table.time('timestamp')
//   table.integer('code')
// })
// .then(() => console.log('tabla creada'))
// .catch(err => console.log(err))

const knexSQLite = require("knex")({
  client: "sqlite3",
  connection: {
    filename: './src/DB/messages.sqlite'
  },
  useNullAsDefault: true
});

knexSQLite.schema.hasTable("messages").then(exists => {
  if (!exists) {
    return knex.schema.createTable('messages', (table) => {
      table.increments('id').primary();
      table.string("email").notNullable();
      table.string("time").notNullable();
      table.string("message").notNullable();
    })
  }
}) 

module.exports = { knex, knexSQLite };