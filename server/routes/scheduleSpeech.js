var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.post('/', function(request){
    var scheduledSpeech = request.body;

    var giveDate = "UPDATE speeches SET speech_date = $1 WHERE id = $2";

    pg.connect(connectionString, function(error, client, done) {
        if(error) {
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        }

        client.query(giveDate, [scheduledSpeech.speech_date, scheduledSpeech.id]);

        client.on('end', function () {
            client.end();
        });
    })
});

module.exports = router;
