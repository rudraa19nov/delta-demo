const express= require("express")
const router= express.Router({mergeParams:true});//mergeparams helps to join parent with children "/listings/:id/reviews" se id ko lene k liye//parent route ke parameter agr child route me use ho rhe to eg-listing id is used in review.js
const wrapAsync= require("../utils/wrapAsync.js")
const Review = require("../models1/review.js");
const Listing = require("../models1/listing.js");
const { validatesReview,isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reveiwController= require("../controller/review.js");

//post review route
router.post("/",isLoggedIn,validatesReview,wrapAsync(reveiwController.createReview));

//review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reveiwController.deleteReview));

module.exports= router;