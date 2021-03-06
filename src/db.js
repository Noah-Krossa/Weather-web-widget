const { connect, set } = require('mongoose')

set('useNewUrlParser', true)
set('useUnifiedTopology', true)
set('useFindAndModify', true)

const connectToMongodb = async (uri = null) => {
  if (uri == null) throw new Error('mongodb uri is not defined')
  await connect(uri)
  console.info('Connected to mongodb database successfuly!')
}
module.exports = { connectToMongodb }
