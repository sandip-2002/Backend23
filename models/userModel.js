const validator=require('validator');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');

const db_link='mongodb+srv://sr8263:Qwertyuiop03@cluster0.oue64x4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("MongoDb connected");
}).catch(function(err){
    console.log(err);
})


const userSchema=mongoose.Schema({
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
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password
        }
    }
});

//////// explore remove in hooks
// userSchema.pre('save',function(){
//     console.log("before saving in DB",this);
// })
// userSchema.post('save',(doc)=>{

//     console.log("after saving in DB",doc);
// })



userSchema.pre('save',function(){
    this.confirmPassword=undefined
})

userSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedString=await bcrypt.hash(this.password,salt);
    this.password=hashedString;
    console.log(hashedString);
})
///models
const userModel= mongoose.model('userModel',userSchema);

module.exports=userModel;