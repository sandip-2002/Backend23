//mongoose ke through content mongodb

const mongoose=require('mongoose');

const db_link='mongodb+srv://sr8263:Qwertyuiop03@cluster0.oue64x4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log("plan MongoDb connected");
}).catch(function(err){
    console.log(err);
})


const planSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
        maxlength:[20,'plan name should not exceed more than 20 characters'] ////////value, custom error message
    },
    duration:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        },'Discount should not exceed price']
    }
});

//'model

const planModel= mongoose.model('planModel',planSchema);

// (async function createPlan(){
//     let plan={
//         name:'SuperFood',
//         duration:30,
//         price:1000,
//         ratingsAverage:5,
//         discount:20
//     }

//     let doc= await planModel.create(plan);
//     console.log(doc);
//     // const doc= new planModel(plan);
//     // await doc.save();
// })();


module.exports=planModel;