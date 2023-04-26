const { reject } = require('bcrypt/promises');

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

async function UserInfo(req, pass) {
  let userid = await generateUsersId();
  const stmt = database.prepare('INSERT INTO Users VALUES (?,?,?,?)')
  stmt.run(`${userid}`, `${req.body.name}`, `${req.body.role}`, `${pass}`)
  console.log('data entered!!!');

//   usersInDB(req.body.username);
}

async function getData(){
  database.all("SELECT * FROM Users", (err, row) => {
    if (err) {

      console.log(err);
    }
      console.log(row, row.length);
      return row;
      
        
    
    
    })

  }
  async function getDataRegister(){
  return new Promise((resolve, reject)=>{
      database.all("SELECT * FROM Users", [], (err, row) => {
        if (err) {
          reject(err)
        }else {
          resolve(row)
          return row
        }
      })
      
    })
}  



function getPass(username) {
  return new Promise((resolve, reject) => {
    database.each("SELECT password FROM Users WHERE name LIKE ?", [username], (err, row) => {
      if (err) {
        
        reject(err)
        
        
      }else {
        resolve(row)
          console.log('row: ', row.password);
          // console.log(resolve(row));
        return row.password;
      }
    })
  })

}

async function generateUsersId(){
  const userData = await getDataRegister();
  // console.log('dat', userData)
  
  const id = await userData.length;
  return "id"+id
}
 
module.exports = { init, UserInfo, getData, getDataRegister, getPass};