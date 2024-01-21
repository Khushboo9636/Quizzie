const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../middlewares/auth.js');
const User = require('../models/user.model.js');


//Register user

router.post('/register',async(req, res ) => {
    try {
        const newUser = await registerUser(req.body);
        const token = newUser.generateAuthToken();
        res.status(201).json({user: newUser, token});

    } catch (error) {
        res.status(400).json({error: error.message });
    }
});


//login user route;

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.json({user, token });
    } catch (error) {
        res.status(401).json({error: error.message });
        
    }
});

module.exports = router;
