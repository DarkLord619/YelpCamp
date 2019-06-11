var mg=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
userSchema= new mg.Schema({
       username:String,
       password:String
});

userSchema.plugin(passportlocalmongoose);
module.exports=mg.model("User", userSchema);
