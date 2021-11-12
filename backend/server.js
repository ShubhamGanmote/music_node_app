const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const musicRoutes = require('./routes/music');

const PORT = 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/music', musicRoutes);

mongoose.connect('mongodb+srv://admin123:admin123@rvce.tzgar.mongodb.net/musicdb?retryWrites=true&w=majority', () => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
