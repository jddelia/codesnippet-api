const express = require('express');
const router = express.Router();

// Snippet Model
const Snippet = require('../models/Snippet');

// /snippets/all GET all snippets from collection
router.get('/all', (req, res) => {
  Snippet.find({})
    .then((snippets) => {
      res.json(snippets);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
})

// /snippets/snippet:id GET snippet by id
router.get('/snippet/:id', (req, res) => {
  Snippet.find({ _id: req.params.id })
    .then((snippet) => {
      res.json(snippet);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// /snippets/create POST new snippet to collection
router.post('/create', (req, res) => {
  const { title, shortDesc, fullDesc, content } = req.body;
  const errors = [];

  // Check required fields
  if (!title || !shortDesc || !fullDesc || !content) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // If any check fails
  if (errors.length > 0) {
    res.json({
      errors
    });
  } else {
    // Checks pass
    Snippet.findOne({ title: title })
      .then((snippet) => {
        // If snippet exists
        if (snippet) {
          errors.push({ msg: 'Snippet already exists' });
          res.json({
            errors
          });
        } else {
          // If snippet doesn't exist, create new snippet
          const newSnippet = new Snippet({
            title,
            shortDesc,
            fullDesc,
            content
          });

          newSnippet.save()
            .then((snippet) => res.json(newSnippet))
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
})

// /snippets/delete/:id DELETE snippet by id
router.delete('/delete/:id', (req, res) => {
  Snippet.findOneAndDelete({ _id: req.params.id })
    .then((snippet) => {
      res.json(snippet);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
})

module.exports = router;