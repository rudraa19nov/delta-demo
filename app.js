if(process.env.NODE_ENV!="production"){//we use dotenv only in production not in development
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");//ejs mate provides template/layouts
const ExpressError= require("./utils/ExpressError.js");
const session= require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy= require("passport-local");
const User = require("./models1/user.js");

const listingRouter=require("./routes/listings.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl=process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store= MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
  secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("ERROR IN MONGO SESSION STORE",err);
})

const sessionOptions={
  store:store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized :true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,//login data save krne ke liye
    maxAge:7*24*60*60*1000,
    httpOnly:true,//secure crosscripting attach
  },
};

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());//lsiting ,review routes s phle flash use krnge

//passport session bhi use krta h 
app.use(passport.initialize());
app.use(passport.session());//use to know that ki jo req br br bhji ja rhi vo same hi user ki hai ar agr same hai to usko dubara password dalne ki jarurat nhi h
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//user se related info session me store krana
passport.deserializeUser(User.deserializeUser());//destore krana details ko after session termination

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;//req.user ko directly navbar.ejs me access nhi kr skte h
  next();//next call is imp otherwise we stuck in this mw
})

app.get("/demouser",async(req,res)=>{
  let fakeUser=new User({
    email:"student@gamil.com",
    username:"heyomm"
  });

let registeredrUser= await User.register(fakeUser,"hello-word")
res.send(registeredrUser);
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


app.all(/.*/,(req,res,next)=>{
  next(new ExpressError(404,"Page not found"))
})

app.use(( err,req,res,next)=>{
  let{statusCode=500, message="something went wrong"}=err;
  res.render("error.ejs",{err})
    // res.status(statusCode).send(message);
  // res.send("something went wrong")
})

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});