const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
