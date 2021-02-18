const {Schema, model} = require('mongoose')

const SOPORTED_CITIES = [
  'New York',
  'London',
  'Manchester',
  'Madrid',
  'Barcelona',
  'Berlin',
  'Istambul',
  'paris',
  'tokyo'
]

const WeatherSchema = new Schema({
  city: {
    type: String,
    required: true,
    enum: SOPORTED_CITIES
  },

  temperature: String,
  windSpeed: String,
  dewPoint: String,
  humidity: String,
  visibilityDistance: String,
  atmospherePressure: String
})
module.exports = model('weathers', WeatherSchema )