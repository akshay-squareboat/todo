todo = require('./todoModel');

exports.index = function(req,res){
  todo.get(function(err,todolist){
    if(err){
      res.json({
        status : "error",
        msg : err
      });
    }
    res.json({
      status : "success",
      msg : "tasks list",
      data : todolist
    });
  });
};

exports.new = function(req,res){
  var todo_ = new todo();
  todo_.name = req.body.name;
  todo_.topic = req.body.topic;
  todo_.save(function(err){
    if(err){
      res.json(err);
    }
    else{
      res.json({
        message : "new task created",
        data : todo_
      })
    }
  });
};
