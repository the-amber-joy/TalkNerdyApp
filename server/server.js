var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var auth = require('./routes/auth');
var testDBroute = require('./routes/testDBroute');
var mySpeeches = require('./routes/mySpeeches');
var pastAgendas = require('./routes/pastAgendas');

var app = express();

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                      ROUTES
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.use('/', index);
app.use('/testDBroute', testDBroute);
app.use('/mySpeeches', mySpeeches);
app.use('/auth', auth);
app.use('/pastAgendas', pastAgendas);



//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//        Server with heroku ENV port selector
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log('Ready for some requests on Port', port)
});