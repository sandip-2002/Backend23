const planModel = require('../models/planModel');
const reviewModel=require('../models/reviewModel');


module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        let rev=await reviewModel.find();
        if(rev){
            return res.json({
                message:'Got all reviews',
                data:rev
            });
        }
        else{
            return res.json({
                message: 'no review stored'
            });
        }
    }
    catch(err){
        return res.json({
            message: err.message
        })
    }
}

module.exports.top3Reviews=async function top3Reviews(req,res){
    try{
        const rev=await reviewModel.find()
        .sort({rating:-1})
        .limit(3);
        if(rev){
            return res.json({
                message:'Got top3 reviews',
                data:rev
            })
        }
        else{
            return res.json({
                message: 'no review stored'
            })
        }
    }
    catch(err){
        return res.json({
            message: err.message
        })
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        const id= req.params.id;
        const rev=await reviewModel.find(
            {plan: {
                _id:id
            }});
        if(rev){
            return res.json({
                message:'review retrieved',
                data:rev
            })
        }
        else{
            return res.json({
                message: 'no review retrieved'
            })
        }
    }
    catch(err){
        return res.json({
            message: err.message
        })
    }
}

module.exports.createReview=async function createReview(req,res){
    try{
        let id=req.params.plan;
        let plan=await planModel.findById(id);
        console.log(plan);
        plan.ratingsAverage=(plan.
            ratingsAverage+req.body.rating)/2;
        
        await plan.save(); 
        let review= await reviewModel.create(req.body);
        if(review){
            return res.json({
                message:'review Created',
                data:review
            })
        }
        else{
            return res.json({
                message:'Invalid data'
            })
        }
    }
    catch(err){
        return res.json({
            message: err.message
        })
    }
}

module.exports.deleteReview= async function deleteReview(req,res){
    try{
        let planid =req.params.id;
        let id=req.body.id;
        let deletedPlan= await reviewModel.findByIdAndDelete(id);
            return res.json({
                message:'Review deleted successfully',
                data:deletedPlan
            })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.updateReview= async function updateReview(req,res){
    try{
        let planid=req.params.id;
        let id=req.body.id;
        let keys=[];
        const dataToBeUpdated= req.body;
        for(let key in dataToBeUpdated){
            if(key=='id') continue;
            keys.push(key);
        }
        let review=await reviewModel.findById(id);
        if(review){
            for( i=0;i<keys.length;i++){
                review[keys[i]]=dataToBeUpdated[keys[i]];
            }
            await review.save();
            return res.json({
                messgae:'data has been updated',
                data:review
            })
        }
        else{
            return res.json({
                messgae:'data has not been updated',
            })
        }
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}

