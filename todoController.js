todo = require('./todoModel');
const redis = require('redis');
const axios = require('axios');

// for caching purpose
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

exports.index = function(req,res){
  // checks in the redis
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
  // creates todo and check for redis , if expires then add all data back by reterieving
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
      });
      redis_client.setex('GET',15,JSON.stringify(todo_));
    }
  });
};
