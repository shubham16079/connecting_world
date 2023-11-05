const mongoose = require('mongoose');
const config = require('./config');
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: false,
  useUnifiedTopology: false,
});
mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB Atlas');
});
module.exports = mongoose;