const express= require('express');
const userRouter=express.Router();
const multer=require('multer');


const {getAllUser,getUser,updateUser,deleteUser,postUser,updateProfileImage}=require('../controller/userController')
// const protectRoute=require('./authHelper');
const {signup,login,isAuthorised,protectRoute,logout,forgetpassword,resetpassword}= require('../controller/authController')

// app.use('/user',userRouter);

// ///////set and get cookies////////
// userRouter.route('/getCookies').get(getCookies)
// userRouter.route('/setCookies').get(setCookies)

// //////////////////////////////////


// userRouter.route('/').get(protectRoute,getUsers).post(postUser).patch(updateUser).delete(deleteUser);
// userRouter.route('/:id').get(getUserById);



//users k options
userRouter.route('/:id').patch(updateUser).delete(deleteUser);


userRouter.route('/signup').post(signup)
userRouter.route('/login').post(login)

//////forgot & reset Password & logout
userRouter.route('/forgetpassword').post(forgetpassword);
userRouter.route('/resetpassword/:token').post(resetpassword);
userRouter.route('/logout').get(logout);


////////multer for fileupload
//upload-> Storage,filter
const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){             ///req,file,callback
        cb(null,'public/images')
    },
    filename: function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const filter= function(req,file,cb){
    if (file.mimetype.startsWith("image")){
        cb(null,true)
    }
    else{
        cb(new Error("Not an Image! Please upload an image"))
    }
}

const upload=multer({
    storage:multerStorage,
    fileFilter: filter
})
userRouter.post("/ProfileImage",upload.single('photo'),updateProfileImage);
userRouter.get('/ProfileImage',(req,res)=>{
    // res.sendFile(path.join(__dirname, '../multer.html'));
    // res.sendFile('../multer.html',{root:__dirname});
    res.sendFile('C:/Backend/Router/multer.html');
})

///profile page lane ka tareeka
userRouter.use(protectRoute);
userRouter.route('/userProfile').get(getUser);



// ////////admin specific functions
userRouter.use(isAuthorised(['admin']));
userRouter.route('/').get(getAllUser)










module.exports=userRouter;