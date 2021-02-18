const { Router } = require('express')

const APIRouter = Router()

APIRouter.get('/test', (req, res) => {
  res.json([])
})

module.exports = APIRouter
