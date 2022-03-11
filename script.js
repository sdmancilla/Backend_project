const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())

// Items
const items = require('./items.route')
app.use('/items', items)

app.get('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});