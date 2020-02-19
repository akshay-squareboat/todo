
let router = require('express').Router();
const redis = require('redis');
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

router.get('/',function(req,res){
  res.json({
      status: 'API Its Working',
      message: 'Welcome to todo app',
  });
})

var todoController = require('./todoController');

function test(req,res,next) {
      console.log('middleware')
      var request_method = "GET";
      redis_client.get(request_method,(err,data) => {
      if(err){
          console.error(err);
          throw err;
        }
      if(data !== null){
        res.send(data);
        }
        else {
          next();
        }
      });
}

router.route('/todo')
     .get(todoController.index)
     .post(todoController.new)

module.exports = router
