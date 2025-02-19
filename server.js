const express=require('express');
const app = express()
const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());

//import person router
const personRouter=require('./routes/personRoutes');
app.use('/person',personRouter);

//import menu router
const menuRouter=require('./routes/menuRoutes');
app.use('/menu', menuRouter);

app.get('/', function (req, res) {
  res.send('Welcome to the hotel')
})

app.listen(3000)