const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const app = express();

const port = 5000; 
const router = express.Router();
const usersRouter = require('./api/users');

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('hello', 'hello world from server side');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,useNewUrlParser:false }));
const mongoose = require('./db'); 
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
server.listen(port, () => { 
  console.log(`Server is running on http://localhost:${port}`);
});
app.use('/api/users', usersRouter);