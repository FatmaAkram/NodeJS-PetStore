const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const dataPath = './data/bids.json';


// @route	POST api/pets/bid/:id
// @desc    Add bids for specfic pet with pet id
// @access  Public

router.post('/bids/:id', [
    check('bid_amount', 'Bid amount is required').not().isEmpty(),
    // User ID can be gotten from authentication later
    check('user_id', 'User ID is required').not().isEmpty() 
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) throw err;
        let json = [];
        try {
            json = JSON.parse(data)
        } catch (e) {
            console.log(e);
        }
        let newBid = {
            user_id: req.body.user_id,
            pet_id: parseInt(req.params.id),
            bid_amount: req.body.bid_amount
        }
        json.push(newBid);
        let newData = JSON.stringify(json, null, 2);
        fs.writeFile(dataPath, newData, 'utf8', (err) => {
            if (err) throw err;
            res.status(200).send('Bid was added successfully');
        });
    });
});

// @route	GET api/pets/bid/:id
// @desc    Get all bids for specfic pet with pet id
// @access  Public

router.get('/bids/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) throw err;
        let json = [];
        try {
            json = JSON.parse(data)
        } catch (e) {
            console.log(e)
        }
        let petBids = json.filter((obj) => {
            return obj.pet_id === req.params.id;
        });
        petBids.length === 0 ? petBids = 'No Bids Yet': '';
        res.status(200).send(petBids);
    });
});

module.exports = router;