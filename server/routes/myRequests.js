var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.post('/', function(request, response){

    var speechReqs = [];
    var user = request.body.google_id;

    pg.connect(connectionString, function(error, client){
        if (error) {
            client.end();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        }

        //This query returns info for all speeches by logged-in req.user
        var queryString = "SELECT * FROM speeches WHERE speaker_google_id = $1 AND speech_date IS NULL ORDER BY date_requested DESC";

        var query = client.query(queryString, [user]);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            speechReqs.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(speechReqs);
        });
    });
});

router.post('/delete', function(request){
    var deleteThis = request.body.speechId;

    var deleteQuery = "DELETE FROM speeches WHERE id = $1";

    pg.connect(connectionString, function(error, client, done) {
        if(error) {
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: error});
        }

        client.query(deleteQuery, [deleteThis]);

        client.on('end', function () {
            client.end();
        });
    })
});


module.exports = router;
