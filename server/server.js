var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var index = require('./routes/index');
var login = require('./routes/login');
var auth = require('./routes/auth');
var mySpeeches = require('./routes/mySpeeches');
var pastAgendas = require('./routes/pastAgendas');
var manageMtg = require('./routes/manageMtg');
var manageRoster = require('./routes/roster');
var agenda = require('./routes/agenda');
var speechAgenda = require('./routes/speechAgenda');
var requestSpeech = require('./routes/requestSpeech');
var getTracks = require('./routes/getTracks');
var myRequests = require('./routes/myRequests');

var app = express();

app.use(express.static('server/public'));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                      ROUTES
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]

app.use('/mySpeeches', mySpeeches);
app.use('/auth', auth);
app.use('/pastAgendas', pastAgendas);
app.use('/manageMtg', manageMtg);
app.use('/manage_roster', manageRoster);
app.use('/agenda', agenda);
app.use('/speechAgenda', speechAgenda);
app.use('/requestSpeech', requestSpeech);
app.use('/myRequests', myRequests);
app.use('/getTracks', getTracks);
app.use('/index', index);
app.use('/', login);



//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//        Server with heroku ENV port selector
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][]
var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log('Ready for some requests on Port', port)
});
