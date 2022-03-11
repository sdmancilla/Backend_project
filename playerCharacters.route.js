const data = require('./data');
const router = require('express').Router();

function getModels3D(modelName) {
    return data.models_3d.filter(model => model.address === modelName);    
}

router.get('/', (req, res) => {
    res.json({ data: data.playerCharacters.filter(playerCharacters => playerCharacters.deleted != true) });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const playerCharacters = data.playerCharacters.find(playerCharacters => playerCharacters.id === parseInt(id));
    if (playerCharacters && playerCharacters.deleted != true){
        const models = getModels3D(playerCharacters.model);
        res.json({ data: {...playerCharacters, models} });
    }
    else
        res.status(404).json({ error: { message: 'Player Character not found' } });
});

router.post('/', (req, res) => {
    const { name, stats, level, title, model, player } = req.body;
    if (!(name && stats && level && title && model && player)) {
        return res.status(404).json({ error: { message: 'Not enough fields' } });
    }
    const playerCharacters = {
        id: data.playerCharacters.length + 1,
        name,
        stats,
        level: parseInt(level),
        title,
        model,
        player
    };
    data.playerCharacters.push(playerCharacters);
    res.json({ message: "Player Character created succesfully" });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, stats, level, title, model } = req.body;
    const playerCharacters = data.playerCharacters.find(playerCharacters => playerCharacters.id === parseInt(id));
    if (playerCharacters && playerCharacters.deleted != true) {
        playerCharacters.name = (name) ? name : playerCharacters.name;
        playerCharacters.stats = (stats) ? parseInt(stats) : playerCharacters.stats;
        playerCharacters.level = (level) ? parseInt(level) : playerCharacters.level;
        playerCharacters.title = (title) ? title : playerCharacters.title;
        playerCharacters.model = (model) ? model : playerCharacters.model;
        res.json({ message: "Player Character updated succesfully" });
    } else {
        res.status(404).json({ error: { message: 'Player Character not found' } });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const oldPlayerCharacter = data.playerCharacters.find(playerCharacters => playerCharacters.id === parseInt(id));
    if (oldPlayerCharacter) {
        oldPlayerCharacter.deleted = true;
        res.json({ message: "Player Character deleted succesfully" });
    } else {
        res.status(404).json({ error: { message: 'Player Character not found' } });
    }
});

module.exports = router;
