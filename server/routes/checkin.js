var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.post('/', function(request){

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        var checkinQuery = "UPDATE roster SET last_checkin = (now()::date) WHERE google_id = $1 RETURNING last_checkin";
        var addAttendees = "UPDATE meetings SET attendee_count = (attendee_count + 1) WHERE date = now()::date";

        client.query(checkinQuery, [request.body.google_id]);
        client.query(addAttendees);

        client.on('end', function () {
            client.end();
        });
    });
});


module.exports = router;
