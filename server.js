const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/socialNetworkDB');


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(require('./routes'));


app.listen(PORT, () => {
  console.log(`🌍 Server running on http://localhost:${PORT}`);
});
