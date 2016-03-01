var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data  + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var meetingData = {};

    //connectionString = connectionString + '?ssl=true';


    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            console.log('Are you working', client);
        }

        //Returns only the next scheduled meeting date, with all speeches scheduled for that date

        // ---- Something weird going on with the speech joins here -------

        //var queryString = "SELECT * \
        //                    FROM speeches \
        //                        JOIN meetings \
        //                            ON speeches.speech_date = meetings.date \
        //                    WHERE speech_date = (SELECT date \
        //                                        FROM meetings \
        //                                        WHERE date >= now()::date \
        //                                        ORDER BY date ASC \
        //                                        LIMIT 1)::date";

        var queryString = "SELECT * \
                                FROM meetings \
                                                WHERE date >= now()::date\
                                                ORDER BY date ASC \
                                                LIMIT 1";

        query = client.query(queryString);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            meetingData = row;
        });

        query.on('end', function () {
            client.end();
            return response.json(meetingData);
        });
    });
});


module.exports = router;
