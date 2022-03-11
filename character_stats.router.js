const express = require('express')
const router = express.Router()
const data = require('./data')

router.get('/', async(req, res) => {
    res.json(data.models_3d)
})

router.get('/:id', async(req, res) => {
    res.json(data.models_3d.find(model => model.id == req.params.id))
})

router.post('/', async(req,res) => {
    const {adress} = req.body
    if (!adress) {
        return res.status(404).json({error: {message: 'Not enough fields'}})
    }
    model = {
        adress,
        id: data.models_3d.length + 1
    }
    data.models_3d.push(model)
    res.status(200).json({message: 'Successfully created'})
    
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
    data = data.models_3d.filter(model => model.id != req.params.id)
    res.status(200).json({message: 'Successfully deleted'})
  })


module.exports = router;