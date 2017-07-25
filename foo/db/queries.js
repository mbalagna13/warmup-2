const knex = require('./knex')

module.exports = {
  getUserByEmail(email) {
    return knex('person').where('email', email).first();
  },
  createUser(user) {
    return knex(users).insert(user).returning('*')
  },
  getAllusers() {
    return knex('users')
  }
}
