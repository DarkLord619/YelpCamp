var mg=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
  {name:"Desert Mesa ",
   image: " https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  {name:"Hush Wild ",
   image: " https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "},
  { name:"Mountain Grey",
   image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60 ",
  description:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "},

]

function seedDb(){
    Comment.remove({},(err)=>{
        if(err)console.log(err);
        else{
          console.log("comment removed");
          Campground.remove({}, (err)=>{
            if(err) console.log(err);
            else{
              console.log("Removed campgrounds");
            }
            data.forEach((seed)=>{
            Campground.create(seed,(err,campground)=>{
              if(err)console.log(err);
              else console.log("added campground");
              var newcomment={
                            text: "It's a nice place. Wish there was internet",
                            author: "Homer"
                            }
               Comment.create(newcomment,(err,comment)=>{
                 if(err)console.log(err);
                 else {
                   console.log("Comment Added");
                   campground.comments.push(comment);
                   campground.save();
                 }
               });

            });
            });
          });
        }
    });

}

module.exports=seedDb;
