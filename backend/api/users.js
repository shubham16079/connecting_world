const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const auth = require('../middleware/auth');
router.post('/create',auth, (req, res) => {
    if (!req.decoded) {
        console.log('authentication failed');
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const { username, email, password } = req.body;
  
    const newUser = new User({
      username,
      email,
      password,
    });
  
    newUser
    .save()
    .then((user) => {
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.expiresIn,
          });
        console.log('User created successfully.');
        res.status(201).json({user,token});
    })
    .catch((err) => {
        console.error('Error creating user:', err);
        res.status(500).send('Error creating user');
    });
  });
router.get('/', auth, async (req, res) => {
    if (!req.decoded) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const userId = req.body.id;
  
    try {
      const user = await User.find().select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Error getting user' });
    }
  });
  router.delete('/delete/:id', auth, async (req, res) => {
    if (!req.decoded) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const userId = req.params.id; 
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await User.findByIdAndRemove(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });
  router.put('/update/:id', auth, async (req, res) => {
    if (!req.decoded) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const userId = req.params.id; 
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.username = req.body.username; 
      user.email = req.body.email;     
  
      await user.save();
  
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  });
  
  module.exports = router;
