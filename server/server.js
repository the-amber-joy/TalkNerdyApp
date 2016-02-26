var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var index = require('./routes/index');
var login = require('./routes/login');
var auth = require('./routes/auth');
var testDBroute = require('./routes/testDBroute');
var mySpeeches = require('./routes/mySpeeches');
var pastAgendas = require('./routes/pastAgendas');
var googleID = require('./routes/googleID');
var manageMtg = require('./routes/manageMtg');
var manageRoster = require('./routes/roster');

var app = express();

app.use(express.static('server/public'));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                      ROUTES
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.use('/index', index);
app.use('/testDBroute', testDBroute);
app.use('/mySpeeches', mySpeeches);
app.use('/auth', auth);
app.use('/pastAgendas', pastAgendas);
app.use('/googleID', googleID);
app.use('/manageMtg', manageMtg);
app.use('/', login);
app.use('/manage_roster', manageRoster);



//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//        Server with heroku ENV port selector
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log('Ready for some requests on Port', port)
});