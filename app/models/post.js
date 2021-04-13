const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
  restuarant: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    red: 'User',
    required: true
  }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
