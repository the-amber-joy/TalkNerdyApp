//*******************************************************************************
//****  run in terminal - node server/database_date_insert.js  ******************
//****  will add ten years worth of Wednesdays (520 days) into db  **************
//****  is set to enter May 20, 2026 as first date (1779235200 UNIX time) *******
//*******************************************************************************


var express = require('express');
var pg = require('pg');

var connectionString = require('../database.json').data + '?ssl=true';

pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

    for(var i = 0; i < 520; i++){

        var query = client.query("INSERT INTO meetings (date) VALUES (to_timestamp(1779235200 + (" + i + "* 604800)))");

    }
        query.on('error', function (error){
            console.log(error);
        });


        query.on('end', function () {
            client.end();
        });
});
