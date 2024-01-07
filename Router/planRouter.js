const express= require('express');
const planRouter=express.Router();
const { protectRoute, isAuthorised } = require('../controller/authController');

const{getPlan,getAllPlans,createPlan,updatePlan,deletePlan,top3Plans}= require('../controller/planController');


//CRUD operation
//all plan
planRouter.route('/allPlans').get(getAllPlans);


//own plan 
////logged in necessary
planRouter.use(protectRoute)
planRouter.route('/plan/:id').get(getPlan);

planRouter.use(isAuthorised(['admin','restaurantowner']))
planRouter.route('/crudPlan')
.post(createPlan)
// .patch(updatePlan)


planRouter.route('/crudPlan/:id').patch(updatePlan).delete(deletePlan);

planRouter.route('/top3').get(top3Plans);

module.exports=planRouter;
///top 3 plan
