const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send(req.query)
});

app.post('/', async (req, res) => {
    res.json(req.body);
});

app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});