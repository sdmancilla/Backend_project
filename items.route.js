const data = require('./data');
const router = require('express').Router();


router.get('/', (req, res) => {
    res.json({ data: data.items.filter(item => item.deleted != true) });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const item = data.items.find(item => item.id === parseInt(id));
    if (item !== undefined && item.deleted != true)
        res.json({ data: item });
    else
        res.status(404).json({ error: { message: 'Item not found' } });
});

router.post('/', (req, res) => {
    const { name, level, description, image, sell_price } = req.body;
    if (!(name && level && description && image && sell_price)) {
        return res.status(404).json({ error: { message: 'Not enough fields' } });
    }
    const item = {
        id: data.items.length + 1,
        name,
        level: parseInt(level),
        description,
        image,
        sell_price: parseInt(sell_price)
    };
    data.items.push(item);
    res.json({ message: "Item created succesfully" });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, level, description, image, sell_price } = req.body;
    const item = data.items.find(item => item.id === parseInt(id));
    if (item !== undefined && item.deleted != true) {
        item.name = (name !== undefined) ? name : item.name;
        item.level = (name !== undefined) ? level : item.level;
        item.description = (name !== undefined) ? description : item.description;
        item.image = (name !== undefined) ? image : item.image;
        item.sell_price = (name !== undefined) ? sell_price : item.sell_price;
        res.json({ message: "Item updated succesfully" });
    } else {
        res.status(404).json({ error: { message: 'Item not found' } });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const oldItem = data.items.find(item => item.id === parseInt(id));
    if (oldItem !== undefined) {
        oldItem.deleted = true;
        res.json({ message: "Item deleted succesfully" });
    } else {
        res.status(404).json({ error: { message: 'Item not found' } });
    }
});

module.exports = router;