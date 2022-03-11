const express = require("express");
const router = express.Router();
const data = require('../data');

router.get("/", async (req, res) => {
    res.status(200).json(data.missions.filter(mission => mission.deleted != true))
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const mission = data.missions.find(mission => mission.id === +id)
    if (mission && mission.deleted != true) {
        res.status(200).json(mission);
    }else{
        res.status(404).json({message: "mission not found"});
    }
});

router.post("/", async (req, res) => {
    const {name, description, level_reward, revel_requirement, quest_giver_character} = req.body;
    if (name && description && level_reward && revel_requirement && quest_giver_character) {
        const item = {
            id: data.missions.length + 1,
            name,
            description,
            level_reward: parseInt(level_reward),
            revel_requirement: parseInt(revel_requirement),
            quest_giver_character
        }
        data.missions.push(item)
        res.status(200).json({message: "mission created"});
    }else{
        res.status(404).json({message: "mission not found"});
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {name, description, level_reward, revel_requirement, quest_giver_character} = req.body;
    const item = data.missions.find(mission => mission === +id);
    if (id && item) {
        item.name = (name) ? name: item.name;
        item.description = (name) ? description: item.description;
        item.level_reward = (name) ? level_reward: item.level_reward;
        item.revel_requirement = (name) ? revel_requirement: item.revel_requirement;
        item.quest_giver_character = (name) ? quest_giver_character: item.quest_giver_character;
        res.status(200).json({message: "mission changed"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.body;
    const item = data.missions.find(mission => mission === +id);
    if (id && item) {
        item.deleted = true;
        res.status(200).json({message: "mission deleted"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});


module.exports = router;