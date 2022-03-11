const express = require("express");
const router = express.Router();
const data = require('../data');

router.get("/", async (req, res) => {
    res.status(200).json(data.mission_objectives.filter(mission_objective => mission_objective.deleted != true))
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const mission_objective = data.mission_objectives.find(mission_objective => mission_objective.id === +id)
    if (mission_objective && mission_objective.deleted != true) {
        res.status(200).json(mission_objective);
    }else{
        res.status(404).json({message: "mission_objective not found"});
    }
});

router.post("/", async (req, res) => {
    const {name, description, count, mission} = req.body;
    if (name && description && count && mission) {
        const item = {
            id: data.mission_objectives.length + 1,
            name,
            description,
            count: parseInt(count),
            mission
        }
        data.mission_objectives.push(item)
        res.status(200).json({message: "mission_objective created"});
    }else{
        res.status(404).json({message: "must join the apropiated parameters"});
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {name, description, count, mission} = req.body;
    const item = data.mission_objectives.find(mission_objective => mission_objective.id === +id);
    if (id && item) {
        item.name = (name) ? name: item.name;
        item.description = (description) ? description: item.description;
        item.count = (count) ? count: item.count;
        item.mission = (mission) ? mission: item.mission;
        res.status(200).json({message: "mission_objective changed"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const item = data.mission_objectives.find(mission_objective => mission_objective.id === +id);
    if (id && item) {
        item.deleted = true;
        res.status(200).json({message: "mission_objective deleted"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});


module.exports = router;