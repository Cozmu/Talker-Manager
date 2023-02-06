const fs = require('fs').promises;
const path = require('path');

const readTalker = async () => {
    try {
        const contentFile = await fs
            .readFile(path.resolve(__dirname, '..', 'talker.json'), 'utf-8');
        const response = JSON.parse(contentFile);
        return response;
    } catch (error) {
        return null;
    }
};

const getAllTalker = async () => {
    const response = await readTalker();
    return response;
};

const getTalkerID = async (id) => {
    const response = await readTalker();
    return response.find((talker) => talker.id === id);
};

module.exports = {
    getAllTalker,
    getTalkerID,
};
