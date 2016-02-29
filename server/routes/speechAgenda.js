//This will get all speeches scheduled for the next meeting, to be shown on the Home page agenda

var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data  + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var speechAgenda = [];

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        //Selects all speeches which have been scheduled by admin for the next upcoming meeting
        var queryString = "SELECT * \
                            FROM speeches \
                                WHERE speech_date = (SELECT date\
                                                    FROM meetings\
                                                        WHERE date >= now()::date\
                                                    ORDER BY date ASC\
                                                        LIMIT 1)::date";

        var query = client.query(queryString);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            speechAgenda.push(row);
        });

        query.on('end', function () {
            client.end();
            console.log('speech Agenda from server:', speechAgenda);
            return response.json(speechAgenda);
        });
    });
});


module.exports = router;
