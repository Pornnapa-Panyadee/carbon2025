const User = require('../Models/user');


exports.read = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        User.finconnectDById(userId, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            const user = result[0];
            delete user.password;
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
}

exports.list = async (req, res) => {
    try {
        //
        User.findAll((err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'database error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.json(result);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }

}

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        User.create(req.body, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'database error' });
            }

            res.json({ message: 'User created successfully', userID: result.insertId, user: req.body });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        User.updateById(userId, req.body, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

exports.remove = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        User.deleteById(userId, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.json({ message: 'User deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};