var express = require("express");
var router = express.Router();
var pg = require('pg');
var passport = require('passport');

var connectionString = require('../../database.json').data;


// Returns the entire list of people
router.get("/", function(req, res) {
    var results = [];

    var queryOptions = {
        userEmail: req.query.email,
        userFirstName: req.query.firstName,
        userLastName: req.query.lastName,
        userGoogleID: req.query.googleID
    };

    pg.connect(connectionString, function (err, client, done) {
        var query = "";
        if(userGoogleID) {
            query = client.query("SELECT * FROM roster WHERE google_id = $1", [userGoogleID]);
            //return query.row;
            console.log("This is working");
            query.on('row', function (row) {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', function () {
                if(results.length > 0) {
                    client.end();
                    return res.json(results);
                } else {
                    query = client.query("INSERT INTO roster (email, first_name, last_name, google_id) " +
                        "VALUES ('profile.emails[0].value','profile.name.familyName', 'profile.name.givenName'," +
                      " 'profile.id'");
                }
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }
            //query = client.query("INSERT INTO roster email, first_name, last_name, google_id"
            //VALUES ('profile.emails[0].value','profile.name.familyName', 'profile.name.givenName',
            //    'profile.id')
        }

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            console.log('GOOGLE ID RESULTS:', results);
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

module.exports = router;
