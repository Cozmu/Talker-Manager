const express = require('express');
const validateLogin = require('../middlewares/validateLogin');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/', validateLogin, (req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
});

module.exports = router;