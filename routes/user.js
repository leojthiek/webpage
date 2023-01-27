const express = require("express");
const router = express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const Customer = require("../middleware/schema");
const { registerschema, loginschema } = require("../middleware/joi");


router.post("/register", async (req, res) => {
  try {
    const { error } = registerschema(req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }

    const email = await Customer.findOne({email:req.body.email});
    if(email)res.status(400).send('user email already exist')

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(req.body.password,salt)

    const user=Customer({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:hash

    })
   user.save()
   res.redirect('/login')
  } catch (error) {
    res.status(500).send(error)
  }
});

router.post('/login',async(req,res)=>{
  try {
  const {error}= loginschema(req.body);
  if(error){
    res.send(error.message)
    return
  }
  const user=await Customer.findOne({email:req.body.email});
  if(!user)return res.status(400).send('invalid email address')

  const password=await bcrypt.compare(req.body.password,user.password);
  if (!password)return res.status(400).send('incorrect password')

  const token= jwt.sign({_id:user._id},process.env.SECRET_KEY);
   res.cookie('jwt',token)
  
   res.redirect('/home')
    
  } catch (error) {
    res.send(error)
  }
})
router

module.exports = router;
