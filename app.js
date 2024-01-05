const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/post');

mongoose.connect('mongodb+srv://luciofurnari99:VfHX5uSjDjMVL4sR@blog-db.tgzgpnb.mongodb.net/Blog-DB?retryWrites=true&w=majority')
.catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(3000, () => {
  console.log('Server listen to port 3000!')
});