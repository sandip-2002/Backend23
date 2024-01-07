const planModel= require('../models/planModel');
module.exports.getAllPlans= async function getAllPlans(req,res){
    try{
        let plans=await planModel.find();
        if(plans){
            return res.json({
                message:'all plans retrieved',
                data:plans
            })
        }
        else{
            return res.json({
                message: 'plans not found'
            })
        };
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }

}

module.exports.getPlan= async function getPlan(req,res){
    try{
        const id=req.params.id;
        let plan=await planModel.findById(id);
        if(plan){
            return res.json({
                message:'all plans retrieved',
                data:plan
            })
        }
        else{
            return res.json({
                message: 'plans not found'
            })
        };
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }

}

module.exports.createPlan=async function createPlan(req,res){
    try{
        let planData=req.body;
        let createdPlan=await planModel.create(planData);
        if(planData){
            return res.json({
                message:'plan created succesfully',
                data:createdPlan
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.deletePlan= async function deletePlan(req,res){
    
    try{
        let id =req.params.id;
        let deletedPlan= await planModel.findByIdAndDelete(id);
            return res.json({
                message:'plan deleted successfully',
                data:deletedPlan
            })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }

}

module.exports.updatePlan= async function updatePlan(req,res){
    
    try{
        let id =req.params.id;
        let dataToBeUpdated=req.body;
        // let updatedData= planModel.findByIdAndUpdate(id,dataToBeUpdated);
        console.log(id);
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan= await planModel.findById(id);
        for(let key=0; key<keys.length; key++){
            plan[keys[key]]=dataToBeUpdated[keys[key]];
        }
        console.log(plan);
        await plan.save();
        return res.json({
            message:"plan is updated successfully",
            data:plan
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }

}

//top 3
module.exports.top3Plans=async function top3Plans(req,res){
    try{
        const Plans=await planModel.find().sort({
            ratingsAverage:-1
        }).limit(3)
        return res.json({
            message:' top 3 plans',
            data:Plans
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}