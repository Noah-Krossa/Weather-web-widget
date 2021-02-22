const moment = require('moment')
const WeatherModel = require('./weather')
const { cities } = require('./config')
const WeatherAPIService = require('../services/freeWeatherAPIService')

class WeatherORM {
  async getWeatherOf(city = null) {
    if (cities.indexOf(city.toLowerCase()) === -1) {
      throw new Error(`${city}is not soported yet`)
    }

    const foundWeather = await WeatherModel.find({ city }).exec()

    // If not found weather of city, generate a city info
    if (foundWeather.length < 1) {
      console.log(`cannot found weather data of ${city}`)
      const result = await this.getWeatherOf(city)
      return result
    }

    // Comparing current date and las update
    // IF info is obsolete, update the info
    const current = moment().unix()
    const lastUpdate = moment(foundWeather.lastUpdate, 'YYYY-MM-DD').unix()
    if (moment(lastUpdate).add(1, 'day').unix() >= current) {
      console.log(`found wather data of${city}, but need to update`)
      const data = await WeatherAPIService(city)
      const result = await WeatherModel.findByIdAndUpdate(
        { city },
        { $set: { weatherHistory: data } },
        { new: true } // Return the updated document
      )
      return result
    }

    // // If all ready just return found city info
    console.log('Data was fetched correctyl')
    return foundWeather
  }

  async addWeather(city) {
    const data = await WeatherAPIService(city)
    const result = await new WeatherModel({ city, weatherHistory: data })
    result.save()
    return result
  }
}

module.exports = WeatherORM
