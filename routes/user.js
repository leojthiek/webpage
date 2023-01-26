const express = require("express");
const router = express.Router();
const bcrypt=require('bcrypt')
const Customer = require("../middleware/schema");
const { registerschema, loginschema } = require("../middleware/joi");

router.get("/", (re, res) => {
  res.send("router hello");
});
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
   user.save().then(data=>{
    res.send(data)
   })
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router;
