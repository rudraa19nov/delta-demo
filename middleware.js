const Listing=require("./models1/listing");
const {listingSchema}=require("./schema.js");
const ExpressError= require("./utils/ExpressError.js");
const Review = require("./models1/review.js");
const {reviewSchema}=require("./schema.js");

//create function to validate listing from backend(hopscotch invalid req)
module.exports.validateListing= (req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg= error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,error);
    }else{
      next();
    }
}

//create function to validate review from backend(hopscotch invalid req)
module.exports.validatesReview= (req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
    if(error){
      let errMsg= error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,error);
    }else{
      next();
    }
}

//create mw to prevent form hopscotch invalid req
module.exports.isLoggedIn=(req,res,next)=>{
// console.log(req.user);
// console.log(req.path,"..", req.originalUrl)//req..originalUrl me hi hme redirect hona hai jb hm logged out k bd login krnge , to iski value store kra lnge 
if(!req.isAuthenticated()){//current session k andr user ki info stored h passport ki help s
    req.session.redirectUrl=req.originalUrl
    req.flash("error","You must be logged in to create listing")
    return  res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirect=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async(req,res,next)=>{
     let { id } = req.params;
     let listing = await Listing.findById(id);
     if(!listing.owner._id.equals(res.locals.currUser._id)){
     req.flash("error","You are not the owner of this listing");
     return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor= async(req,res,next)=>{
     let { id,reviewId} = req.params;
     let review = await Review.findById(reviewId);
     if(!review.author.equals(res.locals.currUser._id)){
     req.flash("error","You are not the author of this review");
     return res.redirect(`/listings/${id}`);
    }
    next();
}