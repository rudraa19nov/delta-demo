const User=require("../models1/user");

 module.exports.signUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp=async(req,res)=>{//wrapasync se hme ek alg page me error show hogi
   try{                                           //try catch se hm wps signup page me ek flash ki trh error dikha skte h
    let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to WanderLust")
        res.redirect("/listings")
    })
   }catch (e) {
    req.flash("error", e.message);  //check it
    res.redirect("/signup");
   }
}

module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.login= async(req,res)=>{
        req.flash("success","Welcome to WanderLust! You are logged in!");
       const redirectUrl = res.locals.redirectUrl || "/listings";//abhi login hone ke bd passport session terminate kr dega to req.session.redirectUrl delete ho jyga to hm ye locals me save krne k bd access krnge qnki locals hr jgh available hote h,
        // to login se phle saveRedirectUrl mw ko call lgynge // /listings ko is wjh s add kiya qnki directly login krne p isLoggedIn trigger nhi hoga ar res.locals m value undefined rhti
       res.redirect(redirectUrl);
;
    }
module.exports.logout=(req,res)=>{
    req.logOut((err)=>{//ek callback ko leta h
        if(err){
           return next(err)
        }
        req.flash("error","you are logged out");
        res.redirect("/listings")
    })
}


