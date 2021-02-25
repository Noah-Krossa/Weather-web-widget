/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const moment = require('moment')
const WeatherModel = require('./weather')
const { cities } = require('./config')
const WeatherAPIService = require('../services/freeWeatherAPIService')

class WeatherORM {
  async getWeatherOf(city = null) {
    if (cities.indexOf(city.toLowerCase()) === -1) {
      throw new Error(`${city}is not soported yet`)
    }

    const foundWeather = await WeatherModel.findOne({ city }).exec()
    // If not found weather of city, generate a city info
    if (!foundWeather) {
      console.log(`cannot found weather data of ${city}`)
      const result = await this.addWeather(city)
      return result
    }

    // Comparing current date and las update
    // IF info is obsolete, update the info
    const current = moment().unix()
    const lastUpdate = moment(foundWeather.lastUpdate, 'YYYY-MM-DD')
      .add(1, 'day')
      .unix()
    console.log(`current ${current}`)
    console.log(`last update ${lastUpdate}`)

    if (lastUpdate < current) {
      console.log(`found wather data of${city}, but need to update`)
      const data = await WeatherAPIService(city)
      const result = await WeatherModel.findOneAndUpdate(
        { city },
        { $set: { weatherHistory: data } },
        { new: true } // Return the updated document
      )
      await result.save()
      return result
    }

    // // If all ready just return found city info
    console.log('Data was fetched correctyl')
    return foundWeather
  }

  async addWeather(city) {
    const data = await WeatherAPIService(city)
    let result = await new WeatherModel({ city, weatherHistory: data })
    result = await result.save()
    return result
  }

  async getAllWeather() {
    const result = []

    for (let i = 0; i < cities.length; i++) {
      const r = await this.getWeatherOf(cities[i])
      result.push(r)
    }
    return result
  }
}

module.exports = WeatherORM
