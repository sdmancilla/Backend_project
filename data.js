const data = {
    missions: [
        {
            id: 1,
            name: "wash the dishes",
            description: "have to wash the dishes",
            level_reward: 1000,
            revel_requirement: 4,
            quest_giver_character: "Valery",
        },
        {
            id: 2,
            name: "Clean the house",
            description: "have to clean the house",
            level_reward: 5000,
            revel_requirement: 5,
            quest_giver_character: "Abuelo",
        }
    ],
    images_2d: [
        {
            id: 1,
            address: "Kra 7M #131-34. T19, A107, Ciudad Caribe - Caribe Verde"
        }
    ],
    mission_objectives: [
        {
            id: 1,
            name: "defeat the boss",
            description: "you'll have to destroy all the towers and then kill the final boss",
            count: 5,
            mission: "wash the dishes"
        },
        {
            id: 2,
            name: "defeat the boss 2",
            description: "you'll have to destroy all the towers and then kill the final boss",
            count: 5,
            mission: "wash the dishes"
        },
        {
            id: 3,
            name: "defeat the boss 3",
            description: "you'll have to destroy all the towers and then kill the final boss",
            count: 5,
            mission: "Clean the house"
        }
    ]
}

module.exports = data;