const express = require('express')
const router = express.Router()
const data = require('../data')

router.get('/', async(req, res) => {
    res.json(data.characters_stats.filter(char => char.deleted != true))
})

router.get('/:id', async(req, res) => {
  const {id} = req.params
  const character = data.characters_stats.find(char => char.id == parseInt(id))
  if(character !== undefined && character.deleted != true){
    res.json(character)
  }
})

router.post('/', async(req,res) => {
    const {atr1, atr2, atr3} = req.body
    const life = (!atr1) ? 0 : atr1*20
    const power = !(atr1 || atr2) ? 0 : atr1 * 10 + atr2 * 25
    const magic = !atr3 ? 0 : atr3 * 100
    if (!(atr1 && atr2 && atr3)) {
        return res.status(404).json({error: {message: 'Not enough fields'}})
    }else{
        character = {
            life,
            power,
            magic,
            atr1,
            atr2,
            atr3,
            id: data.characters_stats.length + 1
          }
          data.characters_stats.push(character)
          res.status(200).json({message: 'Successfully created'})
    }
  })

router.put('/:id', async(req,res) => {
  const {atr1, atr2, atr3} = req.body
   data.characters_stats.forEach(element => {
     if(element.id == req.params.id){
       element.life = !atr1 ? element.life : atr1*20
       element.power = !(atr1 || atr2) ? element.power : atr1 * 10 + atr2 * 25
       element.magic = !atr3 ? element.magic : atr3 * 100
       element.atr1 = (atr1 !== undefined) ? atr1 : element.atr1
       element.atr2 = (atr2 !== undefined) ? atr2 : element.atr2
       element.atr3 = (atr3 !== undefined) ? atr3 : element.atr3
     }
   });
   res.status(200).json({message: 'Successfully updated'})
})

router.delete('/:id', async(req,res) => {
  const {id} = req.params
  const character = data.characters_stats.find(el => el.id === parseInt(id))
    if(character !== undefined){
      character.deleted = true
      res.status(200).json({message: 'Successfully deleted'})
    }else{
      return res.status(404).json({error: {message: 'user doesn\'t exists'}})
    }
})


module.exports = router;
