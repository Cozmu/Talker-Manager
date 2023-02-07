const express = require('express');
const fs = require('fs').promises;
const path = require('path');
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
    validateTalk,
    validateRate,
    validateAge,
    validateWatchedAt,
async (req, res) => {
    const pessoaCadastrada = req.body;
    const result = await talker.getAllTalker();
    pessoaCadastrada.id = result[result.length - 1].id + 1;
    result.push(pessoaCadastrada);
    await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), JSON.stringify(result));
    return res.status(201).json(pessoaCadastrada);
});

router.put('/:id', 
    validateToken,
    validateName,
    validateTalk,
    validateRate,
    validateAge,
    validateWatchedAt,
async (req, res) => {
    const { id } = req.params;
    const result = await talker.getAllTalker();
    const request = result.find((e) => e.id === +id);
    // console.log(request);
    const index = result.indexOf(request);
    const IDNumber = +id;
    const update = { id: IDNumber, ...req.body };
    result.splice(index, 1, update);
    await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), JSON.stringify(result));
    return res.status(200).json(update);
});

router.delete('/:id', 
    validateToken,
async (req, res) => {
    const { id } = req.params;
    const request = await talker.getAllTalker();
    const result = request.filter((e) => e.id !== +id);
    await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), JSON.stringify(result));
    res.status(204).send();
});

module.exports = router;
