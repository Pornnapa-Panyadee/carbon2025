const User = require('../Models/user');

exports.read = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        delete user.password;
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.list = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const result = await User.create(req.body);
        res.status(201).json({
            message: 'User created successfully',
            userID: result.insertId,
            user: req.body,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database error' });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const result = await User.updateById(userId, req.body);
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.remove = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const result = await User.deleteById(userId);
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or already deleted' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
