const express = require("express");
const { mission_objectives } = require("../data");
const router = express.Router();
const data = require('../data');

router.get("/", async (req, res) => {
    const missions = data.missions.filter(mission => mission.deleted != true);
    const missionWithObjectives = missions.map(mission => {
        return {...mission, mission_objectives: getMissionObjectives(mission.name)};
    });
    res.status(200).json(missionWithObjectives);
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const mission = data.missions.find(mission => mission.id === +id)
    if (mission && mission.deleted != true) {
        const item = {
            ...mission,
            mission_objectives: getMissionObjectives(mission.name)
        }
        res.status(200).json(item);

    }else{
        res.status(404).json({message: "mission not found"});
    }
});

router.post("/", async (req, res) => {
    const {name, description, level_reward, level_requirement, quest_giver_character} = req.body;
    if (name && description && level_reward && level_requirement && quest_giver_character) {
        const item = {
            id: data.missions.length + 1,
            name,
            description,
            level_reward: parseInt(level_reward),
            level_requirement: parseInt(level_requirement),
            quest_giver_character
        }
        data.missions.push(item)
        res.status(200).json({message: "mission created"});
    }else{
        res.status(404).json({message: "must join the apropiated parameters"});
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const {name, description, level_reward, level_requirement, quest_giver_character} = req.body;
    const item = data.missions.find(mission => mission.id === +id);
    if (id && item) {
        item.name = (name) ? name: item.name;
        item.description = (description) ? description: item.description;
        item.level_reward = (level_reward) ? level_reward: item.level_reward;
        item.level_requirement = (level_requirement) ? level_requirement: item.level_requirement;
        item.quest_giver_character = (quest_giver_character) ? quest_giver_character: item.quest_giver_character;
        res.status(200).json({message: "mission changed"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const item = data.missions.find(mission => mission.id === +id);
    if (id && item) {
        item.deleted = true;
        res.status(200).json({message: "mission deleted"});
    }else{
        res.status(400).json({message: "must to join an id"});
    }
});

//Get mission objectives
router.get("/mission_objectives", async (req, res) => {
    const missions = data.missions.filter(mission => mission.deleted != true)
    if (missions) {
        let item;
        missions.forEach(mission => {
            
        });
    }else{
        res.status(404).json({message: "mission not found"});
    }
});

function getMissionObjectives(missionName) {
    const mission_objectives = data.mission_objectives.filter(mission_objective => mission_objective.mission === missionName)
    return mission_objectives;
};

module.exports = router;