const express = require('express');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateToken = require('../middlewares/validateToken');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
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

router.post('/', 
    validateToken,
    validateName,
    validateRate,
    validateAge,
    validateTalk,
    validateWatchedAt,
async (req, res) => {
    const pessoaCadastrada = req.body;
    const result = await talker.getAllTalker();
    pessoaCadastrada.id = result[result.length - 1].id + 1;
    console.log(pessoaCadastrada);
    return res.status(201).json(pessoaCadastrada);
});

module.exports = router;
