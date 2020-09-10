const http = require('http');
// var express = require("express")
var user = require('./api/models/user.js');

const express = require ('express');
// const app = express();
const morgan = require('morgan');

const apiRoutes = require('./api/routes/api');

const port=process.env.PORT || 8080
var bodyParser = require('body-parser');
var app=express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(function(req,resp,next){
  resp.setHeader("Access-Control-Allow-Origin","*");
  resp.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
  resp.setHeader("Access-Control-Allow-Headers","Content-Type");

  next()
})

app.use(bodyParser.json());
app.use(express.static('uploads'));

var mongoose=require("mongoose");
  mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true })


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to MongoDB database")
});

exports.connect=db


// Routes which should handle requests
app.use('/api', apiRoutes);


// Insert Subjects
const Subject = require("./api/models/subject");
const Collection = require("./api/models/collection");



Subject.find({ }, function (err, docs) {
  if (docs.length) {}
  else{
    var mysub = ['Antenna','Electronics','Field','Maths','Digital','Micro','Dsp','Communication','C++','Fiber'];

    var subjectModel = mongoose.model("Subject")


    mysub.forEach(function(subject) {
      var newsubject = new subjectModel();
      newsubject.name = subject;
      newsubject.save();
    });

  }

});


//app.listen(port);
console.log("Hello from porttt "+port+" :D" );
app.listen(port);
