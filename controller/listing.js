const Listing=require("../models1/listing")

module.exports.index=async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}
module.exports.renderNewForm=(req, res) => {
  // console.log(req.user);
  res.render("listings/new.ejs");
}

module.exports.showListings=(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({path:"reviews",populate:{path:"author"}})
  .populate("owner");
    // console.log("Listing with populated owner:", listing);

  if(!listing){
    req.flash("error","Listing you requested for does not exist");
    res.redirect("/listings")
  }else{
  // console.log(listing);
  res.render("listings/show.ejs", { listing });
  }
})

module.exports.createListing=async (req, res,next) => {//we can also use try and catch instead of wrapAsync
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; //authorization s phle owner ko save karana pdta h
    //console.log("Saved listing:", newListing);
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
  }

module.exports.renderEditForm=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exist");
    res.redirect("/listings")
  }
  else{
  let originalImageUrl=listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/h_200,w_250");
//   console.log(originalImageUrl)
  req.flash("success","Listing Updated!")
  res.render("listings/edit.ejs", { listing,originalImageUrl });
  }
}

module.exports.updateListing=async (req, res) => {
   if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
   }
   
  let { id } = req.params;
  let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing },{ new: true });
  
  if( typeof req.file !=="undefined"){
  let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();
  }
  req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Listing Deleted!")
  res.redirect("/listings");
}