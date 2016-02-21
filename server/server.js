var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var testDBroute = require('./routes/testDBroute');

var app = express();

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                          ROUTES                            //
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.use('/', index);
app.use('/testDBroute', testDBroute);


// Server with heroku ENV port selector
var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log('Ready for some requests on Port', port)
});