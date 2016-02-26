var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data;
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var meetingData = [];

    connectionString = connectionString + '?ssl=true';

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        //Returns only the next scheduled meeting date, with all speeches scheduled for that date
        var queryString = "SELECT * \
                            FROM speeches \
                                JOIN meetings \
                                    ON speeches.speech_date = meetings.date \
                            WHERE speech_date = (SELECT date \
                                                FROM meetings \
                                                WHERE date >= now()::date \
                                                ORDER BY date ASC \
                                                LIMIT 1)::date";

        var query = client.query(queryString, [user]);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            meetingData.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(meetingData);
            console.log(meetingData);
        });
    });
});


module.exports = router;