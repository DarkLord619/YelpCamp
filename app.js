//init
var express=require("express");
var bodyparser=require("body-parser");
var mg=require("mongoose");
var Campground=require("./models/campground.js");
var Comment=require("./models/comment.js");
var passport=require("passport");
var LocalStrategy=require("passport-local")
var User=require("./models/user.js");
var seedDb=require("./seed.js");
var expressession=require("express-session");
var methodOverride=require("method-override");
var campgroundroutes=require("./routes/campground");
var flash=require("connect-flash");

var commentroutes=require("./routes/comment");

var authroutes=require("./routes/index");



var app=express();
app.use(flash());
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.use(express.static(__dirname + "/public"));

seedDb();

//passport config
app.use(expressession({
           secret: "This is the secret code",
           saveUninitialized: false,
           resave:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
      res.locals.currentUser=req.user;
       res.locals.error=req.flash("error");
      res.locals.success=req.flash("success");
      next();
});
app.use(authroutes);
app.use(campgroundroutes);
app.use(commentroutes);

//Server
app.listen(3001,()=>{
  console.log("YelpCamp Server has Started");
  console.log(__dirname);
}

);

//db mongooose

  mg.connect("mongodb://localhost/yelpcamp",{useNewUrlParser: true});
