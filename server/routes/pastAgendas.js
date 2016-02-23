var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data;
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var pastAgendas = [];

    connectionString = connectionString + '?ssl=true';

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        //This query returns info for all speeches by logged-in req.user
        var queryString = "SELECT * \
                            FROM meetings \
                                JOIN speeches \
                                    ON speeches.date = meetings.date \
                                JOIN roster \
                                    ON speeches.speaker_first_name = roster.first_name \
                                JOIN speech_tracks \
                                    ON speeches.track_project = speech_tracks.project_name";

        var query = client.query(queryString);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            pastAgendas.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(pastAgendas);
            console.log(pastAgendas);
        });
    });
});


module.exports = router;