const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser')
const dotenv=require('dotenv');
const path=require('path');
const cookieParser=require('cookie-parser')

dotenv.config();

const app=express()
app.use(bodyparser.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))



const userroutes=require('./routes/user')
const mainroutes=require('./routes/mainroutes')



app.use('/',userroutes);
app.use('/',mainroutes);


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017',()=>console.log('mongodb connected'))


app.listen('1081',()=>console.log('server running'))

