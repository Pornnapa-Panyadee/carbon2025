const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/user');

const JWT_SECRET = 'your_secret_key'; // ใช้ process.env.JWT_SECRET ใน production

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Email and password are required' });

        const user = await User.findByEmail(email);
        if (!user)
            return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid email or password' });

        // ลบ password ก่อนส่งกลับ
        delete user.password;

        const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
