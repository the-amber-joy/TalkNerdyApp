var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

router.get('/', function(request, response){
    var pastAgendas = [];

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        //This query returns all past meeting agendas
        var queryString = "SELECT * FROM meetings WHERE date < now()::date ORDER BY date DESC";

        var query = client.query(queryString);

        query.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            pastAgendas.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(pastAgendas);
            console.log(pastAgendas);
        });
    });
});


module.exports = router;