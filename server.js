const express = require("express")
const app = express()
const db = require('./database.js')
const jwt = require("jsonwebtoken")
app.set('view-engine', 'ejs')
require("dotenv").config()
const bcrypt = require("bcrypt")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let dbEncryption

app.listen(8000)
db.init();

app.get('/', (req, res) => {
  res.redirect('/identify')
})

app.get('/identify', (req, res) => {
  res.render('identify.ejs')
})

app.get("/admin", async (req,res)=>{
  const users= await db.getDataRegister();
  res.render("admin.ejs", {Users: users})
})

app.post('/identify', async (req, res) => {
  
  const user= await db.getDataRegister()
  console.log('idasdasd',req.body.name)
  const hashedPassword = await db.getPass(req.body.name);
  console.log('hashkkkkkkkkkkkkkkkkkkkkkkkkk', hashedPassword.password);
  console.log("user", user)

  await bcrypt.compare(req.body.password, hashedPassword.password, function (err, response) {
    if (err) {
      // handle error
      console.log('an error occured in server!');
      console.log(err);
    }
    else if (response) {
      
      console.log("true");
        res.render('start.ejs')
      } else {
        console.log("false");
        res.render('fail.ejs')
      }
    });


  })
  
  app.get('/register', (req, res) => {
    res.render('register.ejs')
  })

  app.post('/register', async (req, res) => {
    // if (req.body.username != '') {
      console.log('req', req.body)
      try {
        dbEncryption = await bcrypt.hash(req.body.password, 10)
        db.UserInfo(req, dbEncryption)
        console.log('insertion successfull!!');
      } catch (error) {
        console.log(error);
      }
    // }
    res.redirect('/identify')
  })
