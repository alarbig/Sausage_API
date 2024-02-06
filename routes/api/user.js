const express = require('express');
const router = express.Router();
const User = require('../../model/User');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email, 
            password: req.body.password
        });
        res.status(200).json(userData);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ error: err.message }); // Send the error message back
    }
});

router.get('/', (req, res)=>{
    User.findAll()
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err))
})
  
  module.exports = router;