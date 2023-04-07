// server.js
// load the things we need
const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/profiles";
var express = require('express');
const session = require('express-session'); //npm install express-session
var app = express();
app.use(express.static('public'))
const bodyParser = require('body-parser'); //npm install body-parser

//code to tell express we want to read POSTED forms
app.use(bodyParser.urlencoded({
    extended: true
  }))

//this tells express we are using sesssions. These are variables that only belong to one user of the site at a time.
app.use(session({ secret: 'example' }));
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
// index page
// app.get('/', function(req, res) {
//  res.render('pages/index');
// });

//variable to hold our Database
app.use(bodyParser.urlencoded({
  extended: true
}))
var db;

//this is our connection to the mongo db, ts sets the variable db as our database
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

app.get('/index2', function(req,res){
    if(!req.session.loggedin){res.redirect('/login');return;}
    res.render('pages/index2')
});
app.get('/trending', function(req,res){
    if(!req.session.loggedin){res.redirect('/login');return;}
    
    res.render('pages/Trending')
});

// about page
app.get('/', function(req, res) {
 res.render('pages/index');
});
app.get('/index', function(req,res){
    res.render('pages/index')
});

app.get('/login', function(req,res){
    if(req.session.loggedin){res.redirect('/logout');return;}

res.render('pages/login')
});

app.get('/add', function(req,res) {
  res.render('pages/add')
    });

app.get('/profile', function(req, res) {
    if(!req.session.loggedin){res.redirect('/login');return;}
    
    
    var uname = req.session.currentuser;
    console.log(req.session.currentuser)
    
   
    db.collection('people').findOne({"login.username": uname}, function(err, result) {
      if (err) throw err;
    
  
      console.log(result)
     
  
  
      res.render('pages/profile', {
        
        user: result
        
      })
    });
  
  });

  app.get('/logout', function(req,res){
    req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/');

    }
  );
//********** POST ROUTES - Deal with processing data from forms ***************************


//the dologin route detasl with the data from the login screen.
//the post variables, username and password ceom from the form on the login page.
app.post('/dologin', function(req, res) {
    console.log(JSON.stringify(req.body))
    var uname = req.body.username;
    var pword = req.body.password;
    req.session.currentuser = uname;
  
  
  
    db.collection('people').findOne({"login.username":uname}, function(err, result) {
      if (err) {

        console.log(err)
      };
  
  
      if(!result){
        
        res.redirect('/login');return}
  
  
  
      if(result.login.password == pword){ req.session.loggedin = true; res.redirect('/') }
  
  
  
      else{res.redirect('/login')}
    });
    
  });
  app.post('/adduser', function(req, res) {
    //check we are logged in
    
  
    //we create the data string from the form components that have been passed in
  
    var datatostore = {
      "gender":req.body.gender,
      "name":{"title":req.body.title,"first":req.body.first,"last":req.body.last},
      "location":{"street":req.body.street,"city":req.body.city,"state":req.body.state,"postcode":req.body.postcode},
      "email":req.body.email,
      "login":{"username":req.body.username,"password":req.body.password},
      "dob":req.body.dob,"registered":Date(),
      "picture":{"large":"prototype\public\wallhaven-v9poql.jpg","medium":"prototype\public\wallhaven-v9poql.jpg","thumbnail":"prototype\public\wallhaven-v9poql.jpg"},
      "nat":req.body.nat}
  
  
  //once created we just run the data string against the database and all our new data will be saved/
    db.collection('people').save(datatostore, function(err, result) {
      if (err) {
        console.log(err)
      };
      console.log('saved to database')
      //when complete redirect to the index
      res.redirect('/login')
    })
  });


  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  

