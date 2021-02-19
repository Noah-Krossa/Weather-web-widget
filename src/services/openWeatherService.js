const { API_KEY } = process.env
const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=5`

const Axios = require('axios')

// eslint-disable-next-line consistent-return
module.exports = async (city) => {
  try {
    const { data } = await Axios.get(`${API_URL}&q=${city}`)
    const result = data.forecastday.map((e) => {
      const { day } = e
      return {
        ...day,
        date: e.date,
        dateUNIX: e.date_epoch,
      }
    })
    return result
  } catch (e) {
    console.error(e)
  }
}
