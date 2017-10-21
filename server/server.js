//server set up variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var todos = require('./routes/todos.js');

//app stuff
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todos', todos);


app.listen(port, function(){
    console.log('listening on port', port)
})