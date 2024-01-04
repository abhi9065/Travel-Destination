const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String, 
      ratings : [{
        type : Number,
        min : 0 ,
        max: 10
      }]
    },
  ],
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
