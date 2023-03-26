const sqlite3 = require('sqlite3').verbose()
const database = new sqlite3.Database(':memory:')
const allUsersInDB = [];

function init() {
  database.serialize(() => {
    database.run('CREATE TABLE Users (userID TEXT, name TEXT, role TEXT, password TEXT)')
    const statement = database.prepare('INSERT INTO Users VALUES (?,?,?,?)')
    statement.run(`id1`, `user1`, `student`, `pasword`)
    statement.run(`id2`, `user2`, `student`, `pasword`)
    statement.run(`id3`, `user3`, `student`, `pasword`)
    statement.run(`admin`, `admin`, `admin`, `admin`)
    statement.finalize()
  })
}

module.exports = { init};