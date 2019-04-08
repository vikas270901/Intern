var express=require("express");
var mongo = require("mongoose");
var app = express();
var passport = require("passport");
var parser = require("body-parser");
var User = require("./models/user");
var Schema = require("./models/users");
var LocalStrategy = require("passport-local");
//var fs = require("file-system");
//var multer = require('multer');
//var mongopass = require("passport-local-mongoose");
var ip = process.env.IP || 2022;
var port = process.env.PORT || 2021;
var url = process.env.DATABASEURL || "mongodb://localhost:27017/authn_8";
app.set("view engine", "ejs");
app.use(parser.urlencoded({extended:true}));
app.use(require("express-session")({secret: "This is my secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongo.connect(url, { useNewUrlParser: true });

User.find({}, function(err, res){
	if(res[0] == null){
	User.register(new User({username:"Admin"}), "123", function(err, user){	
	});
	Schema.create({}, function(err, resl){ 
		if(err){console.log(err);}
		else{console.log(resl);
	}});
}});

// var storage = multer.diskStorage({
// 	destination: function(req, file, callback){
// 		callback(null, './uploads');},
// 	filename: function(req, file, callback){
// 		var filename = Date.now()+'-'+file.originalname;	//switch (file.mimetype) {case 'image/png': filename = filename + ".pdf"; break; case 'image/docx': filename = filename + ".docx"; break; default: break;}
// 		callback(null, filename);
// }});
// var upload = multer({storage:storage});

app.get("/", function(req, res){
	res.render("dashbord");
});

app.get('/upload', islogged, function (req, res, next) {
	Schema.find({}, function(err, resl){ 
		if(err){console.log(err);}
		else{res.render("secret", {data:resl});
	} 
	});
});

app.get("/download", function(req, res) {
	res.download("./public/pdf.pdf");
	console.log("File Successfully Downloaded...");
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/upload",
	failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/login");
});

function islogged(req, res, next){
	if(req.isAuthenticated()){
		return next();}
	res.redirect("/login");
}

app.listen(port, process.env.IP, function(){
	console.log("Local Server starts at 2021...");
});

// app.get("/secret", islogged, function(req, res){
// 	res.render("secret");
// });
// app.get('/upload', islogged, function (req, res, next) {
// 	Schema.create({}, function(err, resl){ 
// 		if(err){console.log(err);}
// 		else{res.render("secret", {data:resl});
// 	} 
// 	});
// });