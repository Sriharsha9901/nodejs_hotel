const mongoose=require('mongoose');
require('dotenv').config();
// const mongoURL=process.env.MONGODB_URL_LOCAL;

const mongoURL=process.env.MONGODB_URL;


mongoose.connect(mongoURL)

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to database');
})
db.on('disconnected',()=>{
    console.log('Disconnected to database');   
})
db.on('error',(err)=>{
    console.log('mongdb connecction error:',err);
})

module.exports=db;