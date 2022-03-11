const data = require('../data');
const router = require('express').Router();

function getPlayerCharacters(playerName) {
    return data.playerCharacters.filter(playerCharacter => playerCharacter.player === playerName);    
}

router.get('/', (req, res) => {
    res.json({ data: data.players.filter(player => player.deleted != true) });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const player = data.players.find(player => player.id === parseInt(id));
    if (player && player.deleted != true) {
        const playerCharacters = getPlayerCharacters(player.name);
        res.json({ data: {...player, playerCharacters} });
    }
    else res.status(404).json({ error: { message: 'Player not found' } });
});

router.post('/', (req, res) => {
    const { name, password, username } = req.body;
    if (!(name && password && username)) {
        return res.status(404).json({ error: { message: 'Not enough fields' } });
    }
    const player = {
        id: data.players.length + 1,
        name,
        last_login: Date.now(),
        password,
        username
    };
    data.players.push(player);
    res.json({ message: "Player created succesfully" });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, last_login, password, username } = req.body;
    const player = data.players.find(player => player.id === parseInt(id));
    if (player && player.deleted != true) {
        player.name = (name) ? name : player.name;
        player.last_login = (last_login) ? parseInt(last_login) : player.last_login;
        player.password = (password) ? password : player.password;
        player.username = (username) ? username : player.username;
        res.json({ message: "Player updated succesfully" });
    } else {
        res.status(404).json({ error: { message: 'Player not found' } });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const oldPlayer = data.players.find(player => player.id === parseInt(id));
    if (oldPlayer) {
        oldPlayer.deleted = true;
        res.json({ message: "Player deleted succesfully" });
    } else {
        res.status(404).json({ error: { message: 'Player not found' } });
    }
});

module.exports = router;
