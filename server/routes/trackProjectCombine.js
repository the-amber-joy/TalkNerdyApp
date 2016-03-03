var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = require('../../database.json').data + '?ssl=true';
//var connectionString = process.env.DATABASE_URL || require('../../database.json').data;

var tracks = [];
var projects = [];

router.get('/', function(request, response){

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        //trackQuery
        //Returns array like this:
        //[ { track_name: 'Competent Communicator' } , { track_name: 'qwer' } ]
        var trackQuery = client.query("SELECT DISTINCT track_name FROM speech_tracks");

        trackQuery.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        trackQuery.on('row', function (row) {
            tracks.push(row);
        });

        trackQuery.on('end', function () {
            //console.log(tracks);
            client.end();
            return response.json(tracks);
        });
    });
});

router.get('/', function(request, response){

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
            client.end();
        }

        //projectQuery
        //Returns array like this:
        //[ { track_name: 'Competent Communicator',
        //    project_name: 'Persuade With Power',
        //    project_description: 'Discusses audience analysis and the different forms of persuasion available to a speaker.' },
        //  { track_name: 'Competent Communicator',
        //    project_name: 'Your Body Speaks',
        //    project_description: 'Shows how to complement words with posture, stance, gestures, facial expressions, and eye contact.' },
        //  { track_name: 'qwer',
        //    project_name: 'qwer',
        //    project_description: 'qwer' }
        // ]

        var projectQuery = client.query("SELECT * FROM speech_tracks");

        projectQuery.on('error', function (error){
            console.log(error);
            response.sendStatus(500);
        });

        projectQuery.on('row', function (row) {
            projects.push(row);
        });

        projectQuery.on('end', function () {
            //console.log(projects);
            client.end();
            return response.json(projects);
        });
    });
});


//The goal is to make an array where each track is a separate object, with its projects and project descriptions as unique properties:
var buildTrackObject = function(){
    //first build the array
    var trackObject = [];

    //then populate it

    //build one object inside the array for each track_name
    for (i = 0; i < tracks.length; i++){
        trackObject.push({"track_name" : tracks[i].track_name});

        //And then give properties to that track object
        for (j = 0; j < projectQuery.length; j++){
            if (trackObject[i].track_name == tracks[i].track_name) {
                trackObject.track_name.project[j] = (projects[j]);
                trackObject.track_name.project[j].description = (projects[j].project_description);
            }
        }
    }
};