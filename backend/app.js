const express = require('express')
const mongoose = require('mongoose')

const Port = require('./models/post')

const app = express()

mongoose
  .connect(
    'mongodb+srv://mean:hnusDzKhO7w1wq8z@cluster0.vrn9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Connected to the database'))
  .catch(() => console.log('Connection failed!'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  )
  next()
})

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fafkd232',
      title: 'First server-side post',
      content: 'This is coming from the server',
    },
    {
      id: '320fkdkf',
      title: 'Second server-side post',
      content: 'This is coming from the server!',
    },
  ]

  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts,
  })
})

app.post('/api/posts', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  })
  console.log(post)
  res.status(201).json({
    message: 'Post added successfully',
  })
})

module.exports = app
