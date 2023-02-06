const express = require('express');
const talker = require('../utils/getTalker');

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await talker.getAllTalker();
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(200).json([]);
});

module.exports = router;