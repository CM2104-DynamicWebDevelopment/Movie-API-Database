// server.js
// load the things we need
var express = require('express');
var app = express();
app.use(express.static('public'))
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
// index page
// app.get('/', function(req, res) {
//  res.render('pages/index');
// });

app.get('/index2', function(req,res){
    res.render('pages/index2')
});
app.get('/trending', function(req,res){
    res.render('pages/trending')
});

// about page
app.get('/', function(req, res) {
 res.render('pages/index');
});
app.get('/index', function(req,res){
    res.render('pages/index')
});
app.listen(8080);
console.log('8080 is the magic port');