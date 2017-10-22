//server set up variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var todos = require('./routes/todos.js');
var complete = require('./routes/complete.js');
var edit = require('./routes/edit.js')
var deleteToDo = require('./routes/delete.js')

//app stuff
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todos', todos);
app.use('/complete', complete);
app.use('/edit', edit);
app.use('/delete', deleteToDo);


app.listen(port, function(){
    console.log('listening on port', port)
})