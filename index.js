let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose');
let app = express();
let todoRoutes = require('./todoRoutes');

app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/todo',{useNewUrlParser : true});

var db = mongoose.connection;

if(!db){
  console.log('Error');
}
else {
  console.log('Db connected');
}

var port = process.env.PORT || 80;

app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', todoRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running todoApp on port " + port);
});
