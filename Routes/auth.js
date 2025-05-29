const express = require('express');
const router = express.Router(); // Use router instead of app

router.get('/auth', (req, res) => {
    res.send('Hello World! sdrfsdg');
    // const query = 'SELECT user_id, name, email, role_id, status, created_date, updated_date FROM users';
    // db.query(query, (err, results) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).json({ message: 'Error retrieving users' });
    //     }
    //     res.status(200).json(results);
    // });
});



module.exports = router; // Export the router