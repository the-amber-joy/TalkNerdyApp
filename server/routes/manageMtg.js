var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data;
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;
connectionString = connectionString + '?ssl=true';

//This is where the Admin will see all the open speech submissions which do not have assigned dates yet
router.get('/', function(request, response){
    var openSpeechRequests = [];

    connectionString = connectionString + '?ssl=true';

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        //This query returns all past meeting agendas
        var queryString = "SELECT * FROM speeches WHERE speech_date IS NULL";

        var query = client.query(queryString);

        query.on('error', function (error){
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        });

        query.on('row', function (row) {
            openSpeechRequests.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(openSpeechRequests);
            console.log(openSpeechRequests);
        });
    });
});

//This is where the Admin will be submitting the new/edited meeting data
router.post('/', function(request, response) {
    var meetingData = request.body.meetingData;
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            console.log(err);
            return response.status(500).json({ success: false, data: err});
        } else if (
            /*if the meeting exists, run these queries to edit it*/
            client.query("SELECT FROM meetings WHERE date = $1", [meetingData.date]) != null
        ) {
            //Create the Meeting
            client.query("INSERT INTO meetings\
                (date, \
                theme, \
                location, \
                word_of_day, \
                presiding_officer, \
                toastmaster, \
                general_evauluator, \
                table_topics_czar, \
                speech_evaluator_1, \
                speech_evaluator_2, \
                speech_evaluator_3, \
                grammarian, \
                ah_counter, \
                timer,\
                description,\
                speech_1,\
                speech_2,\
                speech_3)\
            VALUES\
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)",
            [
                meetingData.date,
                meetingData.theme,
                meetingData.location,
                meetingData.word_of_day,
                meetingData.presiding_officer,
                meetingData.toastmaster,
                meetingData.general_evaluator,
                meetingData.table_topics_czar,
                meetingData.speech_evaluator_1,
                meetingData.speech_evaluator_2,
                meetingData.speech_evaluator_3,
                meetingData.grammarian,
                meetingData.ah_counter,
                meetingData.timer,
                meetingData.description,
                meetingData.speech_1,
                meetingData.speech_2,
                meetingData.speech_3
            ]);


            //Add this meeting date to the specified speeches
            client.query("UPDATE speeches\
                SET speech_date = $1, \
                WHERE speech_title = $2 OR $3 OR $4",
                [
                    meetingData.date,
                    meetingData.speech_1,
                    meetingData.speech_2,
                    meetingData.speech_3
                ]);
        } else {
            //if the meeting does not exist, run these queries to add it:

            //Create the Meeting
            client.query("UPDATE meetings \
            SET\
            date = $1,\
                theme = $2,\
                location = $3,\
                word_of_day = $4,\
                presiding_officer = $5,\
                toastmaster = $6,\
                general_evauluator = $7,\
                table_topics_czar = $8,\
                speech_evaluator_1 = $9,\
                speech_evaluator_2 = $10,\
                speech_evaluator_3 = $11,\
                grammarian = $12,\
                ah_counter = $13,\
                timer = $14,\
                description = $15,\
                speech_1 = $16,\
                speech_2 = $17,\
                speech_3 = $18\
            WHERE\
            date = $19",
            [
                meetingData.date,
                meetingData.theme,
                meetingData.location,
                meetingData.word_of_day,
                meetingData.presiding_officer,
                meetingData.toastmaster,
                meetingData.general_evaluator,
                meetingData.table_topics_czar,
                meetingData.speech_evaluator_1,
                meetingData.speech_evaluator_2,
                meetingData.speech_evaluator_3,
                meetingData.grammarian,
                meetingData.ah_counter,
                meetingData.timer,
                meetingData.description,
                meetingData.speech_1,
                meetingData.speech_2,
                meetingData.speech_3
            ]);

            //Add this meeting date to the specified speeches
            client.query("UPDATE speeches\
                SET speech_date = $1, \
                WHERE speech_title = $2 OR $3 OR $4",
                [
                    meetingData.date,
                    meetingData.speech_1,
                    meetingData.speech_2,
                    meetingData.speech_3
                ]);
        }
    });

    query.on('end', function () {
        client.end();
        return response.json(meetingData);
        console.log(meetingData);
    });
});

module.exports = router;