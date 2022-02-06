const express = require("express");
const morgan = require("morgan");
const bodyParser =require("body-parser");
const  Mongoose  = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

const User = require("./models/user");

dotenv.config();

const app = express();

Mongoose.connect(process.env.DATABASE,
    {useNewUrlParser : true,useUnifiedTopology : true},
(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected to database');
    }
})

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//require apis
const CategoryRoutes = require("./routes/category");
const productRoutes = require('./routes/product');
const owenerRoutes = require('./routes/owner');
const userRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const addressRoutes = require("./routes/address");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");
const searchRoutes = require("./routes/search");

 app.use("/api" ,CategoryRoutes);
 app.use("/api" ,productRoutes);
 app.use("/api" ,owenerRoutes);
 app.use("/api" ,userRoutes);
 app.use("/api" ,reviewRoutes);
 app.use("/api" ,addressRoutes);
 app.use("/api" ,paymentRoutes);
 app.use("/api" ,orderRoutes);
 app.use("/api" ,searchRoutes);

app.listen(4000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Listening port 4000",4000);
    }
});