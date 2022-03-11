const express = require('express')
const router = express.Router()
const data = require('./data')

router.get('/', async(req, res) => {
    res.json(data.models_3d.filter(item => item.deleted != true))
})

router.get('/:id', async(req, res) => {
  const {id} = req.params
  const model = data.models_3d.find(model => model.id == parseInt(id))
  if(model !== undefined && model.deleted != true){
    res.json(model)
  }
})

router.post('/', async(req,res) => {
    const {adress} = req.body
    if (!adress) {
        return res.status(404).json({error: {message: 'Not enough fields'}})
    }else{
        model = {
            adress,
            id: data.models_3d.length + 1
          }
          data.models_3d.push(model)
          res.status(200).json({message: 'Successfully created'})
    }
  })

router.put('/:id', async(req,res) => {
   const {adress} = req.body
   data.models_3d.forEach(element => {
     if(element.id == req.params.id){
       element.adress = (adress !== undefined) ? adress : element.adress
     }
   });
   res.status(200).json({message: 'Successfully updated'})
})

router.delete('/:id', async(req,res) => {
  const {id} = req.params
  const model = data.models_3d.find(el => el.id === parseInt(id))
    if(model !== undefined){
      model.deleted = true
      res.status(200).json({message: 'Successfully deleted'})
    }else{
      return res.status(404).json({error: {message: 'user doesn\'t exists'}})
    }
})


module.exports = router;
