var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var tracks = [];

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        var query = client.query("SELECT DISTINCT track_name FROM speech_tracks");

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            tracks.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(tracks);
        });
    });
});


module.exports = router;
