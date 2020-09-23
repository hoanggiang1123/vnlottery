const User = require('../schemas/user')
const jwt = require('jsonwebtoken')

exports.post_signup = (req, res) => {
  const { username, name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email already taken'
      })
    }
    let newUser = new User({ username, name, email, password });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          err: err
        })
      }
      res.json({
        msg: 'Signup success'
      })
    })
  })
}

exports.post_signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Email or Password do not match'
      })
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email or Password do not match'
      })
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // res.setHeader('Cookie', token);
    res.cookie('token', token, { expiresIn: '1d' });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role }
    })
  })
}
