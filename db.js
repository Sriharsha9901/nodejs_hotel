const mongoose=require('mongoose');

const mongoURL='mongodb://localhost:27017/hotels';

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