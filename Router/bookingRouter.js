const { createSession } = require("../controller/bookingController");
const express=require('express');
const bookingRouter=express.Router();
const {protectRoute}=require('../controller/authController');


bookingRouter.post('/createSession',protectRoute,createSession);
bookingRouter.get('/createSession',(req,res)=>{
    res.sendFile("C:/Backend/booking.html");
})

module.exports=bookingRouter