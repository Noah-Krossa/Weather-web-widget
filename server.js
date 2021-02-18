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

  /** Connect to mongodb */
  connectToMongodb(process.env.MONGODB_URI)
} catch (e) {
  console.log(e)
}
console.group('Initialze:')
