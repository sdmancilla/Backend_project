const express = require("express");
const router = express.Router();
const data = require('../data');

router.get("/", async (req, res) => {
    res.status(200).json(data.images_2d.filter(mission => mission.deleted != true))
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const mission = data.images_2d.find(mission => mission.id === +id)
    if (mission && mission.deleted != true) {
        res.status(200).json(mission);
    }else{
        res.status(404).json({message: "image_2d not found"});
    }
});

router.post("/", async (req, res) => {
    const {address} = req.body;
    if (address) {
        const item = {
            id: data.images_2d.length + 1,
            address,
        }
        data.images_2d.push(item)
        res.status(200).json({message: "image_2d created"});
    }else{
        res.status(404).json({message: "must join the apropiated parameters"});
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {address} = req.body;
    const item = data.images_2d.find(image_2d => image_2d.id === +id);
    if (id && item) {
        item.address = (address) ? address: item.address;
        res.status(200).json({message: "image_2d changed"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const item = data.images_2d.find(image_2d => image_2d.id === +id);
    if (id && item) {
        item.deleted = true;
        res.status(200).json({message: "image_2d deleted"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});

module.exports = router;