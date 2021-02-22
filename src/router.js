const { Router } = require('express')
const WeatherORM = require('./models/orm')

const theWeatherManager = new WeatherORM()

const APIRouter = Router()
// eslint-disable-next-line consistent-return
APIRouter.get('/city', async (req, res, next) => {
  const { q } = req.query
  try {
    // Check if q value is defined
    if (typeof q === 'undefined')
      return res.status(400).json({
        code: 400,
        errorMessage: 'It most provide a query (q) value',
      })

    const result = await theWeatherManager.getWeatherOf(q)
    res.json(result)
  } catch (e) {
    return next(e.message)
  }
})

module.exports = APIRouter
