const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

module.exports = Subscriber;