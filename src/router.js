const { Router } = require('express')

const APIRouter = Router()

APIRouter.get('/test', (req, res) => {
  res.send('Have a nice day, evrything are okay :D')
})

module.exports = APIRouter
