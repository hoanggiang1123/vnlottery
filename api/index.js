const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

mongoose
  .connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,    useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => {
      console.log(err);
    });

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

io.on('connection', (socket) => {
  console.log(socket.id)
})

app.use(function(req, res, next) {
  req.io = io;
  next()
})

app.use('/craw', require('./routes/crawLottery'))

app.get('/', (req, res) => {
  res.send('hello')
})

module.exports = app


if (require.main === module) {
  const port = process.env.PORT || 3001
  http.listen(port, () => {
    console.log('API server running on port ' + port)
  })
}
