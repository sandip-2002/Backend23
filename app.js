const express= require('express');
const app=express();

const cookieParser=require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.listen(3000,()=>{
    console.log('connected to port 3000')
})

// let users=[
//     {
//         id:1,
//         name:"Sandip",
//     },
//     {
//         id:2,
//         name:"Nikith",
//     },
//     {
//         id:3,
//         name:"Sharon",
//     },
// ];

const userRouter=require('./Router/userRouter')
app.use('/user',userRouter);

const authRouter=require('./Router/authRouter');
app.use('/auth',authRouter);

const planRouter=require('./Router/planRouter');
app.use('/plans',planRouter);


const reviewRouter=require('./Router/reviewRouter');
app.use('/review',reviewRouter)

const bookingRouter=require('./Router/bookingRouter');
app.use('/booking',bookingRouter);

///

