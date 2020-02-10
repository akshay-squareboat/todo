
let router = require('express').Router();

router.get('/',function(req,res){
  res.json({
      status: 'API Its Working',
      message: 'Welcome to todo app',
  });
})

var todoController = require('./todoController');

router.route('/todo')
     .get(todoController.index)
     .post(todoController.new)

module.exports = router
