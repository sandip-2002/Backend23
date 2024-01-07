const validator=require('validator');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const crypto=require('crypto');

const db_link='mongodb+srv://sr8263:Qwertyuiop03@cluster0.oue64x4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("MongoDb connected");
}).catch(function(err){
    console.log(err);
})


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate:(value)=>{
            if(value.trim()==""){
                throw new Error('Name cannot be empty');
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
        
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:false,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurantOwner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
});

//////// explore remove in hooks
// userSchema.pre('save',function(){
//     console.log("before saving in DB",this);
// })
// userSchema.post('save',(doc)=>{

//     console.log("after saving in DB",doc);
// })


userSchema.methods.createResetToken=function(){
    ///creating unique token using npm i crypto
    const resetToken= crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}


userSchema.pre('save',function(){
    this.confirmPassword=undefined
})

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
//     console.log(hashedString);
// })
///models
const userModel= mongoose.model('userModel',userSchema);

module.exports=userModel;