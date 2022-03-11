const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json())


const character = require('./routes/characters.router')
app.use('/characters', character)

const model_3d = require('./routes/models_3d.router')
app.use('/models_3d', model_3d)

const character_stats = require('./routes/character_stats.router')
app.use('/character_stats', character_stats)

// Items
const items = require('./routes/items.route')
app.use('/items', items)

// Players
const players = require('./routes/players.route')
app.use('/players', players)

// Player Character
const playerCharacters = require('./routes/playerCharacters.route')
app.use('/player-characters', playerCharacters)

//missions
const missions = require('./routes/missions');
app.use('/missions', missions);

//images_2d
const images_2d = require('./routes/images_2d');
app.use('/images_2d', images_2d);

//mission_objectives
const mission_objectives = require('./routes/mission_objectives');
app.use('/mission_objectives', mission_objectives);


app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
