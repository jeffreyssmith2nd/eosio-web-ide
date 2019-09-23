const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const cors = require('cors')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const corsOptions = {
    origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/', (request, response) => {
  response.json({ info: 'Hello!' })
})

app.get('/posts', cors(), db.getPosts)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})