if (process.env.NODE_ENV==='development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

require('./config/mongoose')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})