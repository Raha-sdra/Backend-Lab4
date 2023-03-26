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

app.get('/admin', (req, res) => {
  res.render('admin.ejs')
})

app.get('/identify', (req, res) => {
  res.render('identify.ejs')
})

  
  app.get('/register', (req, res) => {
    res.render('register.ejs')
  })

  app.post('/register', async (req, res) => {
    // if (req.body.username != '') {
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