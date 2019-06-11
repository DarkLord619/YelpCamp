var Campground=require("../models/campground.js");
middlewareObj={};
middlewareObj.checkOwnerShip=function (req,res,next){
    if(req.isAuthenticated()){
          Campground.findById(req.params.id,(err,foundcampground)=>{
                if(err) console.log(err);
                else{
                  if(req.user._id.equals(foundcampground.author.id)){
                     return next();
                  }else {
                    req.flash("error","Permission Denied");
                    res.redirect("back");
                  }
                }
          })
    }else{
          res.redirect("back");
    }
}


middlewareObj.isLoggedIn=function (req,
  res,next){
  if(req.isAuthenticated()){
      return next();}

  req.flash("error","Please Login first");

  res.redirect("/login");
}
module.exports=middlewareObj;
