// const express= require("express");
// const app= express();
// const mongoose = require('mongoose');
// const Listing=require("./models1/listing.js");


// main()
//  .then(()=>{
//     console.log("connection successful")
//  })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }

// app.get("/",(req,res)=>{
//     // console.log("root is working")
//     res.send(" working");
// })

// app.get("/testListing",async(req,res)=>{
//   let sampleListing= new Listing({
//     title:"my new villa",
//     description:"very beautiful",
//     price:1200,
//     location:"goa",
//     country:"india"
//  }) ;

//  await sampleListing.save();
//  console.log("sample was saved");
//  res.send("successful testing");
// })


// app.listen(8080,()=>{
//     console.log("server is listening on port 8080");
// });

//  TEST LISTING
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

//Create Route
// router.post("/",validateListing, wrapAsync(async (req, res,next) => {//we can also use try and catch instead of wrapAsync
//   // let listing= req.body.listing;
//   // new Listing(listing);
//   //console.log(listing);

//   //  if(!req.body.listing){
//   //   throw new ExpressError(400,"send valid data for listing");
//   //  }//now use joi method so cmnt this
//     // let result=listingSchema.validate(req.body);
//     // console.log(result);
//     // if(result.error){
//     //   throw new ExpressError(400,result.error);
//     // }//make listvalidate func

//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//   })
// );
