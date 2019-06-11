var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");
router.get("/",(request, response)=>{
   response.render("landing");
});

router.get("/register",(req,res)=>{
     res.render("register");
});

router.post("/register", (req,res)=>{
  console.log(req.body.username);
     // var newuser=new User({name:req.body.username });
      User.register(new User({username: req.body.username}), req.body.password,(err,user)=>{
        if(err) {
          // console.log(err);
          req.flash("error",err.message);
           return res.redirect("register");
        }
         passport.authenticate("local")(req, res,()=>{
          req.flash("success","Welcome to YelpCamp" +req.user.username);
           res.redirect("/campgrounds");
        });
      });
});


router.get("/login",(req,res)=>{
     res.render("login");
});



router.post("/login",passport.authenticate("local",{
   successRedirect:"/campgrounds",failureRedirect:"/login"}) , (req,res)=>{


});


router.get("/logout",(req,res)=>{
   req.logout();
   req.flash("success","Succesfully logged out");
   res.redirect("/");
});



module.exports=router;
