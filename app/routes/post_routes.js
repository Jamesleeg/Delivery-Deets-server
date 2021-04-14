const express = require('express')

const passport = require ('passport')
const requireToken = passport.authenticate( 'bearer', { session: false})

const { handle404, requireOwnership} = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const Post = require('./../models/post')

const router = express.Router()

router.post('/post', requireToken, (req, res, next) => {

  console.log('The user OBJ:', req.user)
  console.log('the incoming event data is', req.body)

  const postData = req.body
  postData.owner = req.user._id
  // owner = req.user._id
  console.log('this is postData', postData)
  Post.create(postData)
  // console.log('this is req.body.owner', req.body.owner)
    .then(post => res.status(201).json(post))
    .catch(next)
})

  // / index
router.get('/post/', requireToken, (req, res, next) => {
  console.log(req.user._id)
  const userId = req.user._id

  Post.find({owner: userId})
    .then(posts => res.json(posts))
    .catch(next)
})
// delte
router.delete('/post/:id', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      requireOwnership(req, post)
      post.deleteOne()
    })
    .then(post => res.sendStatus(204))
    .catch(next)
})
// update
router.patch('/post/:id', requireToken, removeBlanks, (req, res, next) => {

  delete req.body.post.owner

  Post.findById(req.params.id)

    .then(handle404)

    .then(post => {
      requireOwnership(req, post)
      return post.updateOne(req.body.post)
    })

  // .then(post => post.updateOne(req.body.post))

    .then(() => res.sendStatus(204))

    .catch(next)
})






module.exports = router
