var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");



router.get("/campgrounds",(request,response)=>{
      Campground.find({},(err, allcampground)=>{
        if(err) console.log(err);
        else response.render("campgrounds",{campgrounds:allcampground});
      });

});

router.post("/campgrounds", middleware.isLoggedIn,(req,res)=>{
  // res.send("post route");
       var name=req.body.name;
       var img=req.body.img;
       var description=req.body.description;
       var price=req.body.price;
       var author={id:req.user._id, username:req.user.username};

       var newcampground={name: name, image: img, description:description,author:author,price:price};
       console.log(newcampground);
      Campground.create(newcampground,(err,newone)=>{
          if(err) console.log(err);
          else res.redirect("/campgrounds");
      });

});


router.get("/campgrounds/new",middleware.isLoggedIn, (req,res)=>{
  // res.send("HI there");
  res.render("newcampground");
});

router.get("/campgrounds/:id",middleware.isLoggedIn,(req,res)=>{
   Campground.findById(req.params.id).populate("comments").exec((err,foundcampground)=>{
           if(err) console.log(err);
           else {
             console.log(foundcampground);
             res.render("show",{campground:foundcampground});
         }
   });
});


router.get("/campgrounds/:id/edit",middleware.checkOwnerShip,middleware.isLoggedIn,(req,res)=>{
            Campground.findById(req.params.id,(err,campground)=>{
                  if(err) console.log(err);
                  else {
                    res.render("edit",{campground:campground});
                  }
            });
});

router.put("/campgrounds/:id",middleware.checkOwnerShip,(req,res)=>{
           Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedcampground)=>{
             if(err)console.log(err);
             else
               {
                 res.redirect("/campgrounds/"+ req.params.id);
               }
           })


});

router.delete("/campgrounds/:id",middleware.checkOwnerShip,(req,res)=>{
        Campground.findByIdAndRemove(req.params.id,req.body.campground,(err)=>{
          if(err) console.log(err);
          else res.redirect("/campgrounds");
        })
});









module.exports=router;
