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

  const createdPost = await post.save()

  res.status(201).json({
    message: 'Post added successfully',
    postId: createdPost._id,
  })
})

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  })

  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: 'Update successfully!' })
  })
})

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found!' })
    }
  })
})

app.delete('/api/posts/:id', async (req, res) => {
  await Post.deleteOne({ _id: req.params.id })

  res.status(200).json({
    message: 'Post deleted!',
  })
})

module.exports = app
