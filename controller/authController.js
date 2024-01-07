const express= require('express');
const userModel= require('../models/userModel.js');

// const authRouter=express.Router();
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secret');
const {sendMail} =require('../utility/nodemailer.js')
console.log(typeof JWT_KEY);

module.exports.signup=async function signup(req,res){
    try{
        let dataObj=req.body;
        let user =await userModel.create(dataObj);
        await sendMail("signup",user)
        if(user){
            return res.json({
                message: "user signedup",
                data: user
            })
        }
        else{
            res.json({
                message: "error while signin up"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


///login user
module.exports.login=async function login(req,res){
    try{
        let data=req.body;
        // console.log(data);
        if(data.email){
            let user=await userModel.findOne({email:data.email});
            if(user){
                ///brcrypt ->compare
                // console.log(data);
                if(user.password==data.password){
                    // console.log(data);
                    let uid=user['_id'];
                    let token=jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    return res.json({
                        message:"User has logged in",
                        userDetails:data
                    });
                }
                else{
                    return res.json({
                        mesasge:'wrong credential'
                    })
                }
            }
            else{
                return res.json({
                    mesasge:'Empty field found'
                })
            }
        }
        else{
            res.json({
                message:"user not found"
            })
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}


////to check the user's role [admin, user, restaurant owner, deliverivyboy]


module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
        console.log(req.role);
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            
            res.status(401).json({
                message:"operation not allowed"
            })
        }
    }
}

//protectRoute
module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.login){
            token=req.cookies.login;
            let payload=jwt.verify(token,JWT_KEY);
            if(payload){
                const user=await userModel.findById(payload.payload);
                
                req.role=user.role;
                req.id=user.id;
                // req.user=user;
                next();
            }
            else{
                res.json({
                    message:"Please Login again"
                })
            }
        }
        else{
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Chrome")){
                return res.redirect('/login')
            }
            ///postman
            res.json({
                message:"Please Login again"
            })
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
    
}


////forget password
module.exports.forgetpassword=async function forgetpassword(req,res){
    let emailv=req.body;
    try{
        const user=await userModel.findOne({email:emailv});
        if(user){
            ///createResetToken is used to create a new token
            const resetToken=user.createResetToken();
            //http://abc.com/resetpassword/resetToken
            let resetPasswordLink=`${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`
            //send email to the user
            //nodemailer
            let obj={
                resetPasswordLink:resetPasswordLink,
                email:emailv
            }
            sendMail("resetPassword",obj);
            return res.json({
                message:"resetPassword link sent successfully"
            })
        }
        else{
            return res.json({
                mesage:"please signup"
            })
        }
    }
    catch(err){
        res.status(500).json({
            mesage: err.message
        })
    }
}



//reset password
module.exports.resetpassword=async function resetassword(req,res){
    try{
        const token=req.params.token;
        let {password,confirmPassword}=req.body;
        const user=await userModel.findOne({resetToken:token});
        ///reset pass handler will save updated password in db
        if(user){
            user.resetPasswordHanler(password,confirmPassword);
            await user.save();
            res.json({
                message: "user Password Changed Successfully"
            })
        }
        else{
            res.json({
                message: "user not found"
            })
        }
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.logout=function logout(req,res){
    res.cookie('login','',{maxAge:1});
    res.json({
        message:"user logged out successfully"
    })
}