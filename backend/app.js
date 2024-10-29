const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const postsRoutes = require('./routes/post')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

mongoose
  .connect(
    'mongodb+srv://mean:hnusDzKhO7w1wq8z@cluster0.vrn9p.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Connected to the database'))
  .catch(() => console.log('Connection failed!'))

app.use('/api/posts', postsRoutes)

module.exports = app
