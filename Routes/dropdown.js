const express = require('express');
const router = express.Router(); // Use router instead of app

const { list, listIndustrials } = require('../Controllers/dropdown'); // Import the list function from Controllers/dropdown.js

// Unit
router.get('/units', list);
router.get('/industrials', listIndustrials);

router.get('/rounded', (req, res) => {
    const data = [
        {
            quarter: '1/2568',
            start: '01/01/2568',
            end: '31/03/2568'
        },
        {
            quarter: '2/2568',
            start: '01/04/2568',
            end: '30/06/2568'
        },
        {
            quarter: '3/2568',
            start: '01/07/2568',
            end: '30/09/2568'
        },
        {
            quarter: '4/2568',
            start: '01/10/2568',
            end: '31/12/2568'
        }
    ];
    res.json(data);
});




module.exports = router; // Export the router