require('dotenv').config();
const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'your_secret_key'; // ควรเก็บใน .env

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;