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

function UserInfo(req, pass) {
  const stmt = database.prepare('INSERT INTO Users VALUES (?,?,?,?)')
  stmt.run(`${req.body.userID}`, `${req.body.name}`, `${req.body.role}`, `${pass}`)
  console.log('data entered!!!');

//   usersInDB(req.body.username);
database.all("SELECT userID FROM Users", (err, row) => {
  if (err) {
    console.log(err);
  } else {
    row.forEach(element => {
      console.log('ele', element);
      allUsersInDB.push(element.userID)
    })
    console.log(allUsersInDB, allUsersInDB.length);
    // for (let i = 0; i < allUsersInDB.length; i++) {
    //   console.log(allUsersInDB[i]);
    // }
    
  }
    
})
}

module.exports = { init, UserInfo};