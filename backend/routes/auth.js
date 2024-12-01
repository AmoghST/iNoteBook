const express = require('express');
const router =  express.Router()
const User = require("../models/User");
const { body , validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_secret ='amoghisgoodb$oyyyy'
const fetchuser = require('../middlewares/fetchuser')




///////////////////////////////////////////////////npm install express-validator
// ROUTE 1: create a user using POST '/api/auth/createuser'. no login required 
router.post('/createuser',[
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 3 }),

], async (req, res) => {
   success= false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check whether user exists with same email
    try{

   
    let user = await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({success,"error":"user with this email is already exists"})
    }

    // creating hash and adding salt into password 
    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(req.body.password, salt);
    //creating new user
     user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    //   res.json({error:' please enter unique value for email '})
    // })

    const data= {
      id: user.id
    }
    const authtoken = jwt.sign(data, JWT_secret)
    success = true;
    res.json({success,authtoken})

  }catch{
    res.status(500).send("some error occured  ")

  }
  })
// ROUTE 2: authenticate the user using POST "/api/auth/login" no login required 

//this is code is basically used to login
router.post('/login',[
  body('email','enter valid email').isEmail(),
  body('password','password should not be empty').exists()

], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body; 
    try{
      let user = await User.findOne({email});
      if(!user){
        success = false
        return res.status(400).json({error:"please login with correct credentials"})
      }
      const passwordCompare = await bcryptjs.compare(password, user.password);
      if(!passwordCompare){
        success= false;
        return res.json({success, error:"please login with correct credentials"});

      }
      const data= {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_secret);
      success = true;
      res.json({success, authtoken})
  
     }catch{
      res.status(500).send("internal server error ")
  
    }

})
// ROUTE 3 : get loggdin user details using POST "/api/auth/getuser". login not required 
router.post('/getuser',fetchuser, async (req, res) => {
 
    try{
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password")
      res.send(user);
      
  
     }catch{
      res.status(500).send("internal server error ")
  
    }
  })


  module.exports = router;

  ////jwt- allows secure communication between client and server 