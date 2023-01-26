const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser')

const app=express()
app.use(bodyparser.json());



const userroutes=require('./routes/user')



app.use('/',userroutes);


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017',()=>console.log('mongodb connected'))


app.listen('1080',()=>console.log('server running'))

