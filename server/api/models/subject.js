
const mongoose = require('mongoose');

const subSchema = mongoose.Schema({

    name:{type:String,required:true,unique:true}
});

module.exports = mongoose.model('Subject', subSchema);
