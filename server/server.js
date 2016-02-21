var express = require('express');

var index = require('./routes/index');
var auth = require('./routes/auth');

var app = express();


app.use(express.static('server/public'));

app.use('/auth', auth);
app.use('/', index);





// Server with heroku ENV port selector
var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log('Ready for some requests on Port', port)
});