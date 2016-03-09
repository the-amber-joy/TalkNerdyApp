var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

//This is where the Admin will see all the open speech submissions which do not have assigned dates yet
router.get('/pendingRequests', function(request, response){
    var openSpeechRequests = [];

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
            console.log('Here are the open speech requests: ', openSpeechRequests);
            return response.json(openSpeechRequests);
        });
    });
});

router.get('/getDates', function(request, response){
    var dateArray = [];

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        //This query returns all past meeting agendas
        var queryString = "SELECT date, id FROM meetings WHERE date >= now()";

        var query = client.query(queryString);

        query.on('error', function (error){
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        });

        query.on('row', function (row) {
            dateArray.push(row);
        });

        query.on('end', function () {
            client.end();
            //console.log(dateArray);
            return response.json(dateArray);
        });
    });

});

router.post('/fetchExisting', function(request, response){
    var searchDate = request.body;
    var filledFields = {};

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        var queryString = "SELECT * FROM meetings WHERE date::date = $1";

        var query = client.query(queryString, [searchDate.date.slice(0,10)]);

        query.on('error', function (error){
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        });

        query.on('row', function (row) {
            filledFields = row;
        });

        query.on('end', function () {
            client.end();
            //console.log(filledFields);
            return response.json(filledFields);
        });
    });
});


//This is where the Admin will be submitting the new/edited meeting data
router.post('/submitManagedMeeting', function(request, response) {
    var meetingData = request.body;

    var meetingDetails = [
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
        meetingData.speech_3,
        meetingData.speaker_1_firstname,
        meetingData.speaker_1_lastname,
        meetingData.speaker_2_firstname,
        meetingData.speaker_2_lastname,
        meetingData.speaker_3_firstname,
        meetingData.speaker_3_lastname,
        meetingData.date.slice(0,10)
    ];
    console.log("Meeting Data", meetingData);

    var editMeetingDetails = "UPDATE meetings \
            SET\
                theme = $1,\
                location = $2,\
                word_of_day = $3,\
                presiding_officer = $4,\
                toastmaster = $5,\
                general_evaluator = $6,\
                table_topics_czar = $7,\
                speech_evaluator_1 = $8,\
                speech_evaluator_2 = $9,\
                speech_evaluator_3 = $10,\
                grammarian = $11,\
                ah_counter = $12,\
                timer = $13,\
                description = $14,\
                speech_1 = $15,\
                speech_2 = $16,\
                speech_3 = $17,\
                speaker_1_firstname = $18,\
                speaker_1_lastname = $19,\
                speaker_2_firstname = $20,\
                speaker_2_lastname = $21,\
                speaker_3_firstname = $22,\
                speaker_3_lastname = $23\
            WHERE\
            date = $24";


    pg.connect(connectionString, function (err, client, done) {
        if (err) {
            done();
            console.log(err);
            response.sendStatus(500).json({success: false, data: err});
        }

        //Create the Meeting
        var query = client.query(editMeetingDetails, meetingDetails);


        query.on('end', function () {
            client.end();
            response.sendStatus(200);

        });

    });
});

router.post('/submitManagedMeeting', function(request, response) {
    var meetingData = request.body;



    //Add dates to the requested speeches
    var query = client.query(updateSpeeches, meetingDetails);

    });

module.exports = router;