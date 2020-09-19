const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')


const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(function(req, res, next) {
  req.io = io;
  next()
})

app.use('/craw', require('./routes/crawLottery'))


module.exports = app


if (require.main === module) {
  const port = process.env.PORT || 3001
  http.listen(port, () => {
    console.log('API server running on port ' + port)
  })
}
