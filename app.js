let express = require('express');
let app = express();
let User = require('./models/user');
let bodyParser = require('body-parser');
let { check, validationResult } = require('express-validator/check');
let { matchedData, sanitize } = require('express-validator/filter');
let port = process.env.PORT || 3000;
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/form-app');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

app.post('/', [
  check('email', 'Invalid Email').isEmail().trim().normalizeEmail(),
  check('email').custom(value => {
    return User.findOne({email: value}).then(user => {
      if (user) throw new Error('This email is already in use');
    }, err => console.log(err));
  }),
  check('password', 'Password must have at least 6 characters').isLength({min: 6}),
  check('repassword', 'Password does not matched').custom((value, {req}) => {
    return value === req.body.password;
  }),
  check('name', 'Please enter your name').isLength({min: 1}),
  check('address')
], (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.mapped());
      return res.send(errors.mapped());
    }
    
    let {email, password, name, address} = matchedData(req); //ES6 destructuring
    User.create({email, password, name, address}, (err, user) => {
      if(err) return console.log(err);
      return res.send({success: 1});
    });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});