var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data;
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;
connectionString = connectionString + '?ssl=true';


router.post('/', function(request, response) {
    var meetingData = request.body.meetingData;
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            console.log(err);
            return response.status(500).json({ success: false, data: err});
        } else if (/*if the meeting exists, run these queries to edit it*/) {

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
                timer)\
            VALUES\
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
            [
                meetingData.date,
                meetingData.theme,
                meetingData.location,
                meetingData.word_of_day,
                meetingData.presiding_officer,
                meetingData.toastmaster,
                meetingData.general_evauluator,
                meetingData.table_topics_czar,
                meetingData.speech_evaluator_1,
                meetingData.speech_evaluator_2,
                meetingData.speech_evaluator_3,
                meetingData.grammarian,
                meetingData.ah_counter,
                meetingData.timer
            ]);


            //Insert the speeches
            client.query("UPDATE speeches\
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
                timer)\
            VALUES\
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
                [
                    meetingData.speech_1_title,
                    meetingData.speech_1_track,
                    meetingData.speech_1_project,
                    meetingData.speech_1_name,
                    meetingData.speech_1_blurb,

                    meetingData.speech_2_title,
                    meetingData.speech_2_track,
                    meetingData.speech_2_project,
                    meetingData.speech_2_name,
                    meetingData.speech_2_blurb,

                    meetingData.speech_3_title,
                    meetingData.speech_3_track,
                    meetingData.speech_3_project,
                    meetingData.speech_3_name,
                    meetingData.speech_3_blurb
                ]);
        } else {
            //if the meeting does not exist, run these queries to add it

            //Create the Meeting
            client.query("INSERT INTO tasks (task_name, user_id) VALUES ($1, $2)", [tasks[i], userId]);


            //Insert the speeches
            client.query("INSERT INTO task_dates (date, task_id) VALUES ('today', (SELECT id FROM tasks ORDER BY id DESC LIMIT 1))");

        }
    });
});

module.exports = router;



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
