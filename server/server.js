const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

mongoose
  .connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,    useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => {
      console.log(err);
    });


io.on('connection', (socket) => {
  console.log('socketId', socket.id)
})


app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(function(req, res, next) {
  req.io = io;
  next()
})

app.use('/api/craw', require('./routes/crawLottery'))
app.use('/api/user', require('./routes/user'))

// We instantiate Nuxt.js with the options
var config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console
