//This file was created to test formatting of queries

var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var meetingInfo = [];

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        //SAMPLE QUERY: THIS QUERY JOINS ALL TABLES IN THE DB AND RETURNS EVERYTHING
        var queryString = "SELECT * \
                            FROM meetings \
                                JOIN speeches \
                                    ON speeches.date = meetings.date \
                                JOIN roster \
                                    ON speeches.speaker_name = roster.oauth_name \
                                JOIN speech_tracks \
                                    ON speeches.track_project = speech_tracks.project_name";

        var query = client.query(queryString);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            meetingInfo.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(meetingInfo);
        });
    });
});


module.exports = router;