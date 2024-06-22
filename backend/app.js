const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const Post = require('./models/post')

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

app.get('/api/posts', (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts,
    })
  })
})

app.post('/api/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  })
  await post.save()
  res.status(201).json({
    message: 'Post added successfully',
  })
})

app.delete('/api/posts/:id', async (req, res) => {
  await Post.deleteOne({ _id: req.params.id })

  res.status(200).json({
    message: 'Post deleted!',
  })
})

module.exports = app
