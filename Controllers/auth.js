const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const Company = require('../Models/company');

// const JWT_SECRET = 'your_secret_key'; // ใช้ process.env.JWT_SECRET ใน production
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const company = await Company.findByUserId(user.user_id);
        if (!company) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        delete user.password;



        const expiresIn = '12h';
        const token = jwt.sign(
            { user_id: user.user_id, role_id: user.role_id },
            JWT_SECRET,
            { expiresIn }
        );

        // ดึงเวลาหมดอายุจาก token
        const decoded = jwt.decode(token);
        const expirationTime = decoded.exp * 1000; // timestamp เป็น milliseconds

        res.json({
            message: 'Login successful',
            token,
            expires_at: new Date(expirationTime).toISOString(),
            user,
            company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
