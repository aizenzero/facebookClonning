const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

mongoose.connect("mongodb://localhost:27017/facebookDB",({useNewUrlParser:true}));


const userSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email: String,
    password: String,
});

const User = new mongoose.model("User",userSchema)




app.get("/", function (req,res) {

  res.render("home")
  
  
});

app.get("/create", function (req,res) {
    res.render("create")
});

app.get("/createpage", function (req,res) {
    res.render("createpage")
});






app.post("/",function(req,res) {
    
    const email = req.body.email;
    const password = req.body.password;

    console.log(email,password)

    User.findOne({email:email}, function (err,results) {
        if(results.password===password){
            res.render("homepage")
        }else{
            res.render("error")
        }
  
 
    });
});




app.get("/forget", function (req,res) {
    res.render("forget")
})











// /////////////////////////////////////////////////////////////

app.post("/create", function (req,res) {
    res.render("create")
})




app.post("/register", function (req,res) {

   const newUser = new User({
    
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    password:req.body.password,
    
    
   })

   newUser.save(function (err,results) {
    if(!err){
        res.render("submit")
        console.log("successfully added")
    } else{
        res.send(results)
    }
   })
  
});




app.post("/submited", function (err,res) {
    res.render("home")
})



////////////////////////////////////////////////////////////////////////////



















app.listen(3000, function (req,res) {
    console.log("Server is up and running at port 3000")
});