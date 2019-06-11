var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var passsport=require("passport");
var middleware=require("../middleware");
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,(req,res)=>{
         Campground.findById(req.params.id,(err,foundcampground)=>{
           if(err) console.log(err);
           else {
             res.render("newcomment",{campground:foundcampground});
           }
         });
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,(req,res)=>{
        Campground.findById(req.params.id,(err,foundcampground)=>{
          if(err) console.log(err);
          else{
            Comment.create(req.body.comment,(err,createdcomment)=>{
                   if(err) console.log(err);
                   else{
                     console.log("new one added bt" + req.user);
                     createdcomment.author={id:req.user._id,username:req.user.username};
                     createdcomment.save();
                     foundcampground.comments.push(createdcomment);
                     foundcampground.save();
                     res.redirect("/campgrounds/" + foundcampground._id);
                   }
            });
          }
        });
});













module.exports=router;
