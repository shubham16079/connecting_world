const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    console.log('Decoded token:', decoded);
    req.decoded = decoded;
    next();
  });
}

module.exports = verifyToken;
