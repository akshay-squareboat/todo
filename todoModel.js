const mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  topic : {
    type : String,
    required : true
  }
});

var todo = module.exports = mongoose.model('todo',todoSchema);
module.exports.get = function(callback,limit){
  todo.find(callback).limit(limit)
}
