const express= require('express');
const app=express();

const userModel= require('./models/userModel.js');
const cookieParser=require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.listen(3000,()=>{
    console.log('connected to port 3000')
})

let users=[
    {
        id:1,
        name:"Sandip",
    },
    {
        id:2,
        name:"Nikith",
    },
    {
        id:3,
        name:"Sharon",
    },
];

const userRouter=express.Router();
const authRouter=express.Router();


app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter.route('/').get(getUsers).post(postUser).patch(updateUser).delete(deleteUser)

userRouter.route('/:id').get(getUserById)


///////set and get cookies////////
userRouter.route('/getCookies').get(getCookies)
userRouter.route('/setCookies').get(setCookies)

//////////////////////////////////



async function getUsers(req,res){
    let allUsers=await userModel.find({email:'sr2828@gmail.com'})
    res.json({message:"all users",
    data:allUsers})
};


////signup
authRouter.route('/signup').get(middleware1,getSignUp,middleware2).post(postSignUp)

function middleware1(req,res,next){
    console.log('Middleware1 encounter');
    next();
}

function getSignUp(req,res,next){
    
    console.log('getSignUp called');
    next();
    
}

function middleware2(req,res){
    res.sendFile('C:/Backend/public/index.html');
    console.log('Middleware1 encounter');
}

async function postSignUp(req,res){
    let dataObj=req.body;
    let user =await userModel.create(dataObj);
    // console.log('backend',dataObj);
    res.json({
        message: "user signedup",
        data: user
    })
}
/////////////



function postUser(req,res){
console.log(req.body);
users=req.body;
res.json({
message:"Data received successfully"
})
}

async function updateUser(req,res){
console.log(req.body);
let dataToBeUpdated=req.body;
// for(key in dataToBeUpdated){
// users[key]=dataToBeUpdated[key];
// }
let user=await userModel.findOneAndUpdate({email:'a.nikith04@gmail.com'},dataToBeUpdated);
res.json({
message:"Data updated successfully"
})
}

async function deleteUser(req,res){
    let dataToBeDeleted=req.body; 
    let user= await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
    message:"data has been deleted"
    })
}

function getUserById(req,res){
console.log(req.params.id);
let paramId=req.params.id;
let obj={};
for(let i=0;i<users.length;i++){
if(users[i].id==paramId){
console.log("mil gyi");
obj=users[i];
break;
}
}

res.json({
message:"req received",
data: obj
})
}



function setCookies(req,res){
    // res.setHeader('Set-Cookie','isLoggedIn=true');
    res.cookie('isLoggedIn',true);
    res.send('Cookies has been set');
}


function getCookies(req,res){
    
}
// (async function createUser(){
//     let user={
//         email:'sr2828@gmail.com',
//         password:'Qwertyuiop03',
//         confirmPassword:'Qwertyuiop03'
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// })();

