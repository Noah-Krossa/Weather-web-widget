const { Schema, model } = require('mongoose')

const SOPORTED_CITIES = [
  'New York',
  'London',
  'Manchester',
  'Madrid',
  'Barcelona',
  'Berlin',
  'Istambul',
  'paris',
  'tokyo',
]

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
    enum: SOPORTED_CITIES,
  },
  weatherHistory: [StateSchema],
})

module.exports = model('weathers', WeatherSchema)
