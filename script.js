const express = require('express');
const cors = require('cors');
const app = express();
const missions = require('./routes_sergio/missions');
const images_2d = require('./routes_sergio/images_2d');
const mission_objectives = require('./routes_sergio/mission_objectives');

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send(req.query)
});

app.post('/', async (req, res) => {
    res.json(req.body);
});

//missions
app.use('/missions', missions);
//images_2d
app.use('/images_2d', images_2d);
//mission_objectives
app.use('/mission_objectives', mission_objectives);

app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});