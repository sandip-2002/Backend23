const userModel= require('../models/userModel.js');

module.exports.getUser=async function getUser(req,res){
    let id=req.id;
    console.log(id);
    let user=await userModel.findById(id);
    // let user=req.user;
    if(user){
        return res.json(user);
    }
    else{
        return res.json({
            message:"users not found"
        })
    }
};

module.exports.postUser=function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
    message:"Data received successfully"
    })
}
    
module.exports.updateUser=async function updateUser(req,res){
    try{
        let id=req.params.id;
        
        let user= await userModel.findById(id);
        let dataToBeUpdated=req.body;
        // for(key in dataToBeUpdated){
        // users[key]=dataToBeUpdated[key];
        // }
        
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }
            console.log(user);
            const updatedData=await user.save();
            res.json({
                message:"Data updated successfully"
            })
        }
        else{
            res.json({
                message:"user not found"
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    
}
    
module.exports.deleteUser=async function deleteUser(req,res){
    try{
        let id=req.params.id; 
        let user= await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:'user not found'
            })
        }
        res.json({
            message:"data has been deleted",
            data: user
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}
    
module.exports.getAllUser=async function getAllUser(req,res){
    try{
        let users=await userModel.find();
        if(users){
            res.json({
                message:'users retrieved',
                data:users
            });
        }
    }
    catch(err){
        res.json({
        message:err.message
        })
    }
}


module.exports.updateProfileImage= function updateProfileImage(req,res){
    res.json({
        message:'file uploaded successfully'
    })
}

// function setCookies(req,res){
//     // res.setHeader('Set-Cookie','isLoggedIn=true');
//     res.cookie('isLoggedIn',true,{maxAge: 1000*60*60*24, secure:true, httpOnly:true});
//     res.cookie('isPrime',true);
//     return res.send('Cookies has been set');
// }


// function getCookies(req,res){
//     let cookie= req.cookies;
//     console.log(cookie);
//     res.send("cookies recieved")
// }
