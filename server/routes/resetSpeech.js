//This is where a scheduled meeting is re-queued by removing the date
// removes previously assigned meeting date from the selected speech, and puts speech back in queue to be assigned a meeting date

var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data;
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;
connectionString = connectionString + '?ssl=true';

router.post('/', function(request, response){

    var resetSpeech = "UPDATE speeches\
                SET speech_date = NULL, \
                WHERE speech_title = $1";

    pg.connect(connectionString, function(error, client, done) {
        if(err) {
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: err});
        }

        client.query(resetSpeech, [meetingData.speech_1]);
    })
});