const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Parth is good boy'
var fetchuser = require('../middlewares/fetchuser')





//Create user using post on /api/auth.Doesnt require auth

router.post('/createuser', body('name').isLength({ min: 5 }), body('password').isLength({ min: 8 }),


  async (req, res) => {
    //validator fails errors display
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body);
    //Check for email
    try {
      
      //findone is promise so we need to use await otherwise always email id exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json({ status: 0, errors: 'Email already in use' });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt)

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      
      res.json({ authtoken });
    } catch(err){
      console.log(err);
      res.status(500).json({ error: err})
    }
    // .then(user => res.json(user)).catch(err=>{
    //   res.json({message:err.message});
    // });

    //const user=User(req.body);
    //user.save()
    //res.json(obj)
    //res.send(req.body);

  })
//login route

router.post('/login', body('email').isEmail(), body('password', 'Password cannot be blank').exists(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 0, error: "Invalid Credentials" });
    }
    const password_compare = await bcrypt.compare(password, user.password);
    if (!password_compare) {
      return res.status(400).json({ status: 0, error: "Invalid Credentials" });

    }
    const payload = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(payload, JWT_SECRET)
    res.json({ authtoken });
  } catch (errors) {
    res.status(500).send("Some Error Occured")
  }

});
//loggedin user details get
router.get('/getuser', fetchuser, async (req, res) => {

  try {
    user_id = req.user.id;
    const user = await User.findById(user_id).select("-password");
    res.json({ user })
  } catch (errors) {
    res.status(500).send("Some Error Occured");
  }
})

module.exports = router