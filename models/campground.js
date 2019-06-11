var mg=require("mongoose");
var CampgroundSchema= new mg.Schema({
   name: String,
   image:String,
   description:String,
   price: Number,
   author:{
          id:{
            type:mg.Schema.Types.ObjectId,
            ref: "User"
          },
          username:String
   },
  comments:[
          {
            type: mg.Schema.Types.ObjectId,
            ref: "Comment"
          }
  ]
});



module.exports=mg.model("Campground", CampgroundSchema);
