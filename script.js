const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())

// Items
const items = require('./items.route')
app.use('/items', items)

// Players
const players = require('./players.route')
app.use('/players', players)

// Player Character
const playerCharacters = require('./playerCharacters.route')
app.use('/player-characters', playerCharacters)

app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
