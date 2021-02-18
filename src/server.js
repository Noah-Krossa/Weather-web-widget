const {createApp} = require('./app')
const {connectToMongodb} = require('./db')
const APIRouter = require('./router')

try {
  const app = createApp([], APIRouter)
  const PORT = app.get('port')
  /** INITIALIZE SERVER */
  app.listen(PORT, ()=> {
    console.log(`Express application running in: http://localhost:${PORT}`)
  })

  /** Connect to mongodb */
  connectToMongodb(process.env.MONGODB_URI)
  
} catch(e) {
  console.log(e)
}