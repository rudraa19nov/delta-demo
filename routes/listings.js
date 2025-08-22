const express= require("express")
const router= express.Router();
const Listing = require("../models1/listing.js");
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {validateListing}= require("../middleware.js");
const {isLoggedIn}= require("../middleware.js");
const {isOwner}= require("../middleware.js");
// const path = require("path");
                
const listingController= require("../controller/listing.js")
const multer  = require('multer')//use multer for backend to understand uploaded image file
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })//store image in folder

//Index & create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
  // validateListing,
  upload.single('listing[image]'),
  wrapAsync(listingController.createListing)
);

//New Route
router.get("/new",isLoggedIn ,listingController.renderNewForm)

//Show ,Update Delete route
router.route("/:id")
.get( wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner,
  validateListing,
  upload.single('image'),
  wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports= router;//route same rhnge jb creation k andr changes lane honge to  controller k pss chnge krnge