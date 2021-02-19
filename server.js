const cors = require('cors')
const helmet = require('helmet')
const { createApp } = require('./src/app')
const { connectToMongodb } = require('./src/db')
const APIRouter = require('./src/router')

try {
  const app = createApp([cors(), helmet()], APIRouter)
  const PORT = app.get('port')
  /** INITIALIZE SERVER */
  const server = app.listen(PORT, () => {
    console.info(`Express application running in: http://localhost:${PORT}`)
  })
  // Exporting app server
  module.exports = server

  /** Separate test context to dev/prod contexts
   * The reason behind this is for not alterate db when run test
   */
  let MONGODB_URI
  if (process.env.NODE_ENV === 'development')
    MONGODB_URI = process.env.MONGODB_URI
  else MONGODB_URI = process.env.MONGODB_URI

  /** Connect to mongodb */
  connectToMongodb(MONGODB_URI)
} catch (e) {
  console.log(e)
}
console.group('Initialze:')
