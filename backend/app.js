const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongooseConnection.js')
require('dotenv').config();

connectDB();
const indexRouter = require('./routes/indexRouter.js');
const hisaabRouter = require('./routes/hisaabRouter.js')
const db = require('./config/mongooseConnection.js');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  credentials: true
}));

app.use('/', indexRouter);
app.use('/hisaab',hisaabRouter);


app.listen(3000,function(){
    console.log('server chl rha h')
})