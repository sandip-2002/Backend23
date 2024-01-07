const express= require('express');
const userModel= require('../models/userModel.js');

const authRouter=express.Router();
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secret');

////signup
// authRouter.route('/signup').get(middleware1,getSignUp,middleware2).post(signup)

// authRouter.route('/login').post(login);

// function middleware1(req,res,next){
//     console.log('Middleware1 encounter');
//     next();
// }

// function getSignUp(req,res,next){
    
//     console.log('getSignUp called');
//     next();
    
// }

// function middleware2(req,res){
//     res.sendFile('C:/Backend/public/index.html');
//     console.log('Middleware1 encounter');
// }

// async function postSignUp(req,res){
//     let dataObj=req.body;
//     let user =await userModel.create(dataObj);
//     // console.log('backend',dataObj);
//     res.json({
//         message: "user signedup",
//         data: user
//     })
// }


// async function loginUser(req,res){
//     try{
//         let data=req.body;
//         if(data.email){
//             let user=await userModel.findOne({email:data.email});
//             if(user){
//                 ///brcrypt ->compare
//                 if(user.password==data.password){
//                     let uid=user['_id'];
//                     let token=jwt.sign({payload:uid},JWT_KEY);
//                     res.cookie('login',token,{httpOnly:true});
//                     return res.json({
//                         message:"User has logged in",
//                         userDetails:data
//                     });
//                 }
//                 else{
//                     return res.json({
//                         mesasge:'wrong credential'
//                     })
//                 }
//             }
//             else{
//                 return res.json({
//                     mesasge:'Empty field found'
//                 })
//             }
//         }
//         else{
//             res.json({
//                 message:"user not found"
//             })
//         }
//     }catch(err){
//         return res.status(500).json({message:err.message});
//     }
// }


/////////////

module.exports=authRouter;