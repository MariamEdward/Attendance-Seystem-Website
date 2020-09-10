const mongoose = require('mongoose');
const studentidSchema = mongoose.Schema({


   id:{type:String,required:true,unique:true},

});


module.exports = mongoose.model('Studentid', studentidSchema);
