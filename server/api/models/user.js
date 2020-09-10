const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
   username:{type:String,required:true},
   email:{ type: String ,unique:true},
   id:{type:String,required:true },
   password: {type:String,required:true ,required:true},

 subjects :
[
  {
  sub:String,attendance:[{type:String}]
   }

]
 })


module.exports = mongoose.model('User', userSchema);
