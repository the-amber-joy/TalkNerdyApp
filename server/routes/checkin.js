var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.post('/', function(request, response){

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
            return response.status(500).json({ success: false, data: err});
        }
        console.log('request.body on server side', request.body);

        var checkinQuery = "UPDATE roster SET last_checkin = (now()::date) WHERE google_id = $1";

        client.query(checkinQuery, request.body.google_id);

        client.on('end', function () {
            client.end();
        });
    });
});


module.exports = router;
