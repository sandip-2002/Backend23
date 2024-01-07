const mongoose=require('mongoose');

const db_link='mongodb+srv://sr8263:Qwertyuiop03@cluster0.oue64x4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("review MongoDb connected");
}).catch(function(err){
    console.log(err);
})

const reviewSchema= new mongoose.Schema({
    review:{
        type:String,
        reuired:[true,'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to a user'],
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan'],
    }
})

///find or findById or findOne (whenever invoked user and plan should be populated)
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select: "name profileImage",
    }).populate("plan");
    next();
})
const reviewModel=mongoose.model('reviewModel',reviewSchema);

module.exports=reviewModel;