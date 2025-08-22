 const mongoose=require("mongoose");
 const Schema= mongoose.Schema;
 const passportLocalMongoose=require("passport-local-mongoose");

 const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
 });

 userSchema.plugin(passportLocalMongoose);//it creates automatically username and password in your schema,and add hashing salting also,and adds some extra methods like change and set password

 module.exports=mongoose.model("User",userSchema);