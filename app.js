const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const { mongoURI } = require('./config/keys');

const app = express();

// Connect to DB
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(helmet());
app.use(compression());

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Routes
app.use('/snippets', require('./routes/snippets'));
app.use('/subscribers', require('./routes/subsrcibers'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});