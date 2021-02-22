const { API_KEY } = process.env
const moment = require('moment')
const Axios = require('axios')

const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=5`

// eslint-disable-next-line consistent-return
module.exports = async (city) => {
  console.log('Weather service loading data...')
  try {
    const { data } = await Axios.get(`${API_URL}&q=${city}`)
    const result = data.forecast.forecastday.map((e) => {
      const { day, date } = e
      return {
        temperature: day.avgtemp_c,
        windSpeed: day.maxwind_kph,
        humidity: day.avghumidity,
        visibilityDistance: day.avgvis_km,
        condition: day.condition.text,
        date: moment(date).format('YYYY-MM-DD'),
      }
    })
    return result
  } catch (e) {
    console.error(e)
  }
}
