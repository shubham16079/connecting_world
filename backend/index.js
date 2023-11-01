const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000; 
const router = express.Router();
const usersRouter = require('./api/users');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,useNewUrlParser:false }));
const mongoose = require('./db'); 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use('/api/users', usersRouter);