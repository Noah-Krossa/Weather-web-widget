const {createApp} = require('./app')
const APIRouter = require('./router')

try {
  const app = createApp([], APIRouter)
  const PORT = app.get('port')

  /** INITIALIZE SERVER */
  app.listen(PORT, ()=> {
    console.log(`Express application running in: http://localhost:${PORT}`)
  })

} catch(e) {
  console.log(e)
}