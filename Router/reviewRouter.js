const express=require('express');
const reviewRouter= express.Router();
const {getAllReviews,top3Reviews,getPlanReviews,createReview,updateReview,deleteReview}= require('../controller/reviewController')
const { protectRoute, isAuthorised } = require('../controller/authController');

reviewRouter.route('/all')
.get(getAllReviews);

reviewRouter.route('/top3reviews')
.get(top3Reviews);

reviewRouter.route('/:id')
.get(getPlanReviews);

reviewRouter.use(protectRoute);
reviewRouter.route('/crud/:plan')
.post(createReview);

reviewRouter.use(isAuthorised(['admin','restaurantowner']));
reviewRouter.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview);

module.exports=reviewRouter;
