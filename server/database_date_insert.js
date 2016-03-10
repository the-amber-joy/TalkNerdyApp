var express = require('express');
var pg = require('pg');

var connectionString = require('../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

    for(var i = 1; i < 520; i++){

        var query = client.query("INSERT INTO meetings (date) VALUES (to_timestamp(1464739200 + (" + i + "* 604800)))");

    }

        query.on('error', function (error){
            console.log(error);
        });

        query.on('end', function () {
            client.end();
        });

});
