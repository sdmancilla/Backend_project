const express = require('express')
const router = express.Router()
const data = require('./data')

router.get('/', async(req, res) => {
    res.json(data.characters)
})

router.get('/:id', async(req, res) => {
    res.json(data.characters.find(char => char.id == req.params.id))
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
    data = data.characters.filter(obj => obj.id != req.params.id)
    res.status(200).json({message: 'Successfully deleted'})
  })


module.exports = router;