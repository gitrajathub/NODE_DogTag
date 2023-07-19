const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  dogName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  parentName: {
    type: String,
    required: true
  },
  nature: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;

