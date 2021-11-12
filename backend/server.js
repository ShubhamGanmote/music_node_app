const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const musicRoutes = require('./routes/music');

const PORT = 5000;
// Add your mongodb atlas url in below variable
const MongoDdUrl = '';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use('/songs', express.static(__dirname + '/uploads'));
app.use('/api/music', musicRoutes);

mongoose.connect(MongoDdUrl, () => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
