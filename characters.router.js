const express = require('express')
const router = express.Router()
const data = require('./data')

router.get('/', async(req, res) => {
  character_list = data.characters.map(char => {
    if(char.deleted != true){
      const stats = data.characters_stats.find(elem => elem.id === char.id)
      const character = {
        ...char,
        stats
      }
      return character
    }
  })
  res.json(character_list)
})

router.get('/:id', async(req, res) => {
  const {id} = req.params
  const character = data.characters.find(char => char.id == parseInt(id))
  const missions = data.missions.map(elem => {
    if (elem.quest_giver_character === character.name){
      return elem.name
    }
  })
  const model = data.models_3d.map(elem => {
    if(elem.adress === character.model){
      return elem.adress
    }
  })
  const stats = data.characters_stats.find(elem => elem.id === character.id)
  if(character !== undefined && character.deleted != true){
    res.json({...character, missions, model, stats})
  }
})

router.post('/', async(req,res) => {
    const {name, stats, level, title, model} = req.body
    if (!(name && stats && level && title && model)) {
        return res.status(404).json({error: {message: 'Not enough fields'}})
    }else{
        character = {
            name,
            stats,
            level,
            title,
            model,
            id: data.characters.length + 1
          }
          data.characters.push(character)
          res.status(200).json({message: 'Successfully created'})
    }
  })

router.put('/:id', async(req,res) => {
   const {name, stats, level, title, model} = req.body
   data.characters.forEach(element => {
     if(element.id == req.params.id){
       element.name = (name !== undefined) ? name : element.name
       element.stats = (stats !== undefined) ? stats : element.stats
       element.level = (level !== undefined) ? level : element.level
       element.title = (title !== undefined) ? title : element.title
       element.model = (model !== undefined) ? model : element.model
     }
   });
   res.status(200).json({message: 'Successfully updated'})
})

router.delete('/:id', async(req,res) => {
  const {id} = req.params
  const character = data.characters.find(el => el.id === parseInt(id))
    if(character !== undefined){
      character.deleted = true
      res.status(200).json({message: 'Successfully deleted'})
    }else{
      return res.status(404).json({error: {message: 'user doesn\'t exists'}})
    }
})


module.exports = router;
