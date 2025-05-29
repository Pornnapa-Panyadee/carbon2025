const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL user
    password: '',      // Replace with your MySQL password
    database: 'cfp_data'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// 1. Create a new user
app.post('/users', async (req, res) => {
    const { name, email, password, role_id, status } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Ensure await is used

        const query = `
      INSERT INTO users (name, email, password, role_id, status, created_date, updated_date)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;

        db.query(query, [name, email, hashedPassword, role_id, status || 'enable'], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ message: 'Error creating user' });
            }

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    user_id: result.insertId,
                    name,
                    email,
                    role_id,
                    status: status || 'enable'
                }
            });
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ message: 'Server error' });
    }

});
// 2. Get all users
// app.get('/users', (req, res) => {
//     const query = 'SELECT * FROM users';
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Error retrieving users' });
//         }
//         res.status(200).json(results);
//     });
// });
app.get('/users', (req, res) => {
    const query = 'SELECT user_id, name, email, role_id, status, created_date, updated_date FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error retrieving users' });
        }
        res.status(200).json(results);
    });
});

// 3. Get a user by ID
app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;

    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error retrieving user' });
        }
        if (!result.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result[0]);
    });
});

// 4. Update a user by ID
app.put('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { name, email, password, status } = req.body;

    try {
        // 1. ดึงข้อมูลเดิม
        db.query('SELECT * FROM users WHERE user_id = ?', [user_id], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error retrieving user' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user = results[0];

            // 2. เตรียมข้อมูลใหม่ (ใช้ของเก่าถ้าไม่ส่งมา)
            const updatedName = name ?? user.name;
            const updatedEmail = email ?? user.email;
            const updatedStatus = status ?? user.status;
            let updatedPassword = user.password;

            if (password) {
                try {
                    updatedPassword = await bcrypt.hash(password, 10);
                } catch (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: 'Error hashing password' });
                }
            }

            // 3. ตรวจสอบ status (ถ้ามี)
            const validStatus = ['enable', 'disable'];
            if (status && !validStatus.includes(status)) {
                return res.status(400).json({ message: 'Invalid status value. Must be enable or disable.' });
            }

            // 4. ทำการ update
            const updateQuery = `
                UPDATE users
                SET name = ?, email = ?, password = ?, status = ?, updated_date = NOW()
                WHERE user_id = ?
            `;

            db.query(updateQuery, [updatedName, updatedEmail, updatedPassword, updatedStatus, user_id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error updating user' });
                }

                res.status(200).json({ message: 'User updated successfully' });
            });
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// 5. Delete a user by ID
app.delete('/users/:user_id', (req, res) => {
    const { user_id } = req.params;

    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting user' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
