const Listing=require("../models1/listing");
const Review=require("../models1/review");

module.exports.createReview= async(req,res)=>{
    console.log(req.body);
    
  let listing= await Listing.findById(req.params.id);
  if (Array.isArray(req.body.review.rating)) {//radio button passing string and it stored in the form of array,so use array concept to convt num
  req.body.review.rating = Number(req.body.review.rating[0]);
 } else {
  req.body.review.rating = Number(req.body.review.rating);
}

  if (req.body.review && req.body.review.rating) {// Ensure rating is a number
    req.body.review.rating = Number(req.body.review.rating);
  }
  let newReview= new Review(req.body.review)//review ki body backend ke pss a gyi 
  newReview.author = req.user._id;
  // console.log(newReview)
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();//existng data ke andr save
  req.flash("success"," New Review Created!");
  res.redirect(`/listings/${listing._id}`);
  // console.log("new reivew saved")
  // res.send("new review saved")
}
module.exports.deleteReview=async(req, res)=>{
  let{id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})//the $pull operator removes from an existing array all instances of a value or values that match a specified condition
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted!")
  res.redirect(`/listings/${id}`)
}
