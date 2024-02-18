const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/index');

mongoose.connect(`mongodb+srv://luciofurnari99:${process.env.DB_PASSWORD}@blog-db.tgzgpnb.mongodb.net/Blog-DB?retryWrites=true&w=majority`)
.catch((error) => console.log(error));

const app = express();

// Configure cors
app.use(cors());

app.use(express.json());

app.use('/api', router.post, router.user, router.comments);

app.listen(3000, () => {
  console.log('Server listen to port 3000!')
});