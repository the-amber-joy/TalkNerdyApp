var app = require('express');
var path = require('path');

var router = app.Router();

//Serve login page back on basic root Get request
router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/login.html'));
});


module.exports = router;