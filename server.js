const { createApp } = require('./src/app')
const { connectToMongodb } = require('./src/db')
const APIRouter = require('./src/router')

try {
  const app = createApp([], APIRouter)
  const PORT = app.get('port')
  /** INITIALIZE SERVER */
  app.listen(PORT, () => {
    console.info(`Express application running in: http://localhost:${PORT}`)
  })

  /** Separate test context to dev/prod contexts
   * The reason behind this is for not alterate db when run test
   */
  const MONGODB_URI =
    process.env.NODE_ENV === 'development'
      ? process.env.MONGODB_URI
      : process.env.MONGODB_TEST_URI

  /** Connect to mongodb */
  connectToMongodb(MONGODB_URI)
} catch (e) {
  console.log(e)
}
console.group('Initialze:')
