const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");
const Subject = require("../models/subject");
const Collection= require("../models/collection");
const Studentid= require("../models/studentid");
const Instructor= require("../models/instructor");

router.post("/y",(req,res,next) =>
{
for(var i=1; j=6,i<j; i++){
for(var k=i; k>0; k--)
  {
  console.log ("*")
  // console.log("k",k)
  }
}
})





router.post("/id-insert",(req,res,next) =>{
  var idsModel = mongoose.model("Studentid");
  var newId = new idsModel();
  newId.id = req.body.id;
  newId.save(function (err) {
    if (!err) {
      console.log("success");
      res.send("ok");
    }

})
})




router.post("/instructor-insert",(req,res,next) =>{
  var instructorsModel = mongoose.model("Instructor");
  var newInstructor = new instructorsModel();
  newInstructor.username = req.body.username1;
   newInstructor.password = req.body.password1;
  newInstructor.save(function (err) {
    if (!err) {
      console.log("success");
      res.send("ok");
    }

})
})



router.post("/signup", (req, res, next) => {
  var idsModel = mongoose.model("Studentid");
  var newId = new idsModel();
  newId.id = req.body.id1;
  idsModel.find({id:newId.id},function(err,docs){


  if(docs.length)
{
  var usersModel = mongoose.model("User")
  var newUser = new usersModel();
  newUser.username = req.body.username1;
  newUser.password = req.body.password1;
  newUser.id = req.body.id1;
  newUser.email = req.body.email1;

  usersModel.find({ $or: [{ username: newUser.username },{email: newUser.email}]}, function (err, docs) {
    // value=newUser.username;
    if (docs.length) {
      console.log("User Already Exists");
      res.send("User already exists")
      console.log(docs);
    } else {
      newUser.save(function (err) {
        if (!err) {
          console.log("success");
          res.send("ok")
        }
        else {
          errMsg = "ERROR-addUserAccount-can not save to DB, check connection :"
          console.log("faild");
          console.log(err);
          res.send("error")
        }
      });
    }
  });
//new
}
else{
  res.send("wrong id")
}
})
//end of new
});


router.post("/login", (req, res, next) => {
  console.log(req.body)

  User.find({$and:[{ username: req.body.username1, password: req.body.password1 }]})
    .exec()
    .then(user => {
      if (req){
      if (user.length < 1) {
         Instructor.find({$and:[{ username: req.body.username1, password: req.body.password1 }]})
        .exec()
        .then(instructor => {
          if (instructor.length < 1) {
            return res.status(401).json({
              status:401,
              message:'Auth Fail'

            })
          }
          else {
            console.log("instructor", instructor);
            return res.status(200).json(

              {
                status:201,
                message:'instructor'

              }
            );
          }
        })

      }
      else {
        return res.status(200).json({
          status:200,
          message:'student'

        }) ;



      }
    }

        });
});


router.post("/insert-sub-user", (req, res, next) => {   // when coming sub is individual
  var name = req.body.username;
  var subb = req.body.mySelect;
  console.log(name)
  console.log(subb)

  User.findOneAndUpdate({username: name} ,{$push: {subjects:subb}} ).exec().then(user=>{
      console.log(user)
      if(user==null) {
        return res.status(401).json({
          message: "fail "
          })
      }
      else
      {
        res.send("ok")

    }
})
})







//send all subjects in subject model
  router.get("/Subjects", (req, res, next) => {
    Subject.find({}, function(err, subjects) {
      var subjectMap = [];

      subjects.forEach(function(subject) {
        subjectMap.push(subject.name);
      });

      res.send(subjectMap);
      console.log (subjectMap)
    });
  });




  router.post("/attendancebysub", (req, res, next) => {
    console.log( req.body);
    if (req.body.sub){

    var sub = req.body.sub

      Collection.find({"data.material": {'$regex': req.body.sub}}, function(err, collections) {

          var matrix=[];
          console.log("------>", collections.length);

          for(var i=0; j=collections.length,i<j; i++){
          var t=[];
          console .log (collections[i].data)
          t.push(collections[i].data[0].material);

          t.push(collections[i].data[1].date);

           for(var x=2; v=collections[i].data.length,x<v; x++){
            t.push(collections[i].data[x].name)
           }
             matrix.push(t)
           }

           console.log("matrix",matrix)

           res.send(matrix)

    });
}

  });




//save array sent from camera to collection model
router.post("/camera", (req, res, next) => {

console.log(req.body);

var collectionModel = mongoose.model("Collection")
var newCollection = new collectionModel();

newCollection.data = req.body;
newCollection.save(function (err) {
  if (!err) {
    console.log("success");
//    res.send("ok")
  }
  else {
    errMsg = "ERROR-addUserAccount-can not save to DB, check connection :"
    console.log("faild");
    console.log(err);
  }

//new
var subb = req.body[0].material;
var date = req.body[1].date;     //{"date": "Fri Jun 21 02:24:32 2019"}
console.log(subb)
console.log(date)
for(var i=2; j=req.body.length,i<j; i++){

var name = req.body[i].name;
console.log(req.body[i].name)

User.findOneAndUpdate({$and:[{ username: name },{"subjects.sub": subb}]},{$push: {"subjects.$.attendance":date}}).exec().then(user=>{
if (user==null) {
 return res.status(401).json({      //say fail if some name is not exists
 message: "fail "
 })
}
 else {

   return res.status(200).json({
   message: "ok "
   })
    console.log(user.subjects)

 }


 });
}

});

});




router.get("/choose-sub/:username", (req, res, next) => { // send stuudent`s subjects
        console.log(req.params.username)
  User.aggregate(
      [
          // Query argument to match document
          { "$match": {
            username: req.params.username
          }},

          // Flatten array out
          { "$unwind": "$subjects" },

          // Project wanted fields
        { "$project":

          {"sub": "$subjects.sub"}

         }

      ],
      function(err,result) {
        var s= []
        for(var i=0; j=result.length,i<j; i++){
          s.push(result[i].sub)
        }
      console.log(s)
      //  console.log("R",result)
      console.log(result)
        res.send(s)

      }

  );

});



router.get("/attendance/:username/:sub", (req, res, next) => {           //need cook // مش شغااااال
  subb =req.params.sub;
  User.aggregate(
      [
          // Query argument to match document
          { "$match": {
            $and:[{username: req.params.username},{"subjects.sub":subb}]
          }},

          // Flatten array out
          { "$unwind": "$subjects" },

          // Filter array
          { "$match": {
              "subjects.sub": subb
          }},

          // Project wanted fields
        { "$project":

          {"attendance": "$subjects.attendance"}

        }

      ],
      function(err,result) {

        console.log("R",result[0].attendance)
        res.send(result[0].attendance)


      }


  );

});







module.exports = router;
