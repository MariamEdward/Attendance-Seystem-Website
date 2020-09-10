const mongoose = require('mongoose');
const colectionSchema = mongoose.Schema({

    data:
      {type:Array}

});

module.exports = mongoose.model('Collection',colectionSchema);
