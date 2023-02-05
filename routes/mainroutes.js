const express=require('express');
const router=express.Router();
const auth=require('../middleware/jwt')



router.get('/main',(req,res)=>{
    res.render('main.ejs')
})
router.get('/register',(req,res)=>{
    res.render('register.ejs')
})
router.get('/login',(req,res)=>{
    res.cookie('jwt',"")

    res.render('login.ejs')

})
router.get('/home',auth,(req,res)=>{
    res.render('home.ejs')
})
console.log('state')





module .exports=router;