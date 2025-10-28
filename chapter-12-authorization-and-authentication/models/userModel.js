const mongoose = require('mongoose')

const userShema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is Required']
  },
  userType: {
    type: String,
    enum: ['guest', 'host'],
    default: 'guest',
    // required: true,
  }
})

module.exports = mongoose.model('User', userShema)