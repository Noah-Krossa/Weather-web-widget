const { Schema, model } = require('mongoose')
const moment = require('moment')
const { cities } = require('./config')

const StateSchema = new Schema({
  date: Date,
  temperature: String,
  feelsLike: String,
  windSpeed: String,
  windDirection: String,
  dewPoint: String,
  humidity: String,
  condition: String,
  visibilityDistance: String,
  atmospherePressure: String,
})

const WeatherSchema = new Schema({
  city: {
    type: String,
    required: true,
    enum: cities,
  },
  lastUpdate: Date,
  weatherHistory: [StateSchema],
})

// eslint-disable-next-line func-names
WeatherSchema.pre('save', function (done) {
  this.lastUpdate = moment().format('YYYY-MM-DD')

  console.log('updating last update date')
  done()
})

module.exports = model('weathers', WeatherSchema)
