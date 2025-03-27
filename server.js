const express=require('express');
const app = express()
const db=require('./db');
//import person router
const personRouter=require('./routes/personRoutes');
//import menu router
const menuRouter=require('./routes/menuRoutes');

require('dotenv').config();


const port=process.env.PORT||3000;


const bodyParser=require('body-parser');
app.use(bodyParser.json());


const passport=require('./auth');
app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false});


//middleware function for logging
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] request made to: ${req.originalUrl}`);
  next();
}
app.use(logRequest);


app.use('/person',personRouter);

app.use('/menu', menuRouter);


app.get('/' ,function (req, res) {
  res.send('Welcome to the hotel');
})

app.listen(port,()=>{
  console.log('Server started'); 
})