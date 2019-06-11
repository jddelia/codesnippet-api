const express = require('express');
const router = express.Router();

// Snippet Model
const Subscriber = require('../models/Subscribers');

// /subscribers/create POST new snippet to collection
router.post('/create', (req, res) => {
  const { email } = req.body;
  const errors = [];

  // Check required fields
  if (!email) {
    errors.push({ msg: 'Please add email' });
  }

  // If any check fails
  if (errors.length > 0) {
    res.json({
      errors
    });
  } else {
    // Checks pass
    Subscriber.findOne({ email: email })
      .then((subscriber) => {
        // If subscriber exists
        if (subscriber) {
          errors.push({ msg: 'Subscriber already exists' });
          res.json({
            errors
          });
        } else {
          // If subscriber doesn't exist, create new subscriber
          const newSubscriber = new Subscriber({
            email
          });

          newSubscriber.save()
            .then((subscriber) => res.json(newSubscriber))
            .catch((err) => {
              console.log(err);
              res.json(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
});

module.exports = router;