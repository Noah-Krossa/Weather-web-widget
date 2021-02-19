const { Schema, model } = require('mongoose')
const { cities } = require('./config')

const StateSchema = new Schema({
  date: Date,
  temperature: String,
  feelsLike: String,
  windSpeed: String,
  windDirection: String,
  dewPoint: String,
  humidity: String,
  visibilityDistance: String,
  atmospherePressure: String,
})

const WeatherSchema = new Schema({
  city: {
    type: String,
    required: true,
    enum: cities,
    lastUpdate: Date,
  },
  weatherHistory: [StateSchema],
})

module.exports = model('weathers', WeatherSchema)
