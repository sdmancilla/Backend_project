const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json())

const character = require('./characters.router')
app.use('/characters', character)

const model_3d = require('./models_3d.router')
app.use('/models_3d', model_3d)

const character_stats = require('./character_stats.router')
app.use('/character_stats', character_stats)

app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
