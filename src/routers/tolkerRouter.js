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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await talker.getTalkerID(+id);
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;