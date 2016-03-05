app.factory('UserService', function(){

    var userInfo = {
        firstName: '',
        lastName: '',
        id: 0,
        isadmin: '',
        role: '',
        google_id: 0
    };

    return userInfo;

});

app.factory('TrackService', function(){

    var tracks;

    $http.get('/getTracks').then(function(response){
        tracks = response.data;
    });

    return tracks;

    //Returns array like this:
    //[ { track_name: 'Competent Communicator' } , { track_name: 'qwer' } ]


});

app.factory('ProjectService', function(){

    var projects;

    $http.get('/getProjects').then(function(response){
        projects = response.data;
    });

    return projects;

    //Returns array like this:
    //[ { track_name: 'Competent Communicator',
    //    project_name: 'Persuade With Power',
    //    project_description: 'Discusses audience analysis and the different forms of persuasion available to a speaker.' },
    //  { track_name: 'Cogmpetent Communicator',
    //    project_name: 'Your Body Speaks',
    //    project_description: 'Shows how to complement words with posture, stance, gestures, facial expressions, and eye contact.' },
    //  { track_name: 'qwer',
    //    project_name: 'qwer',
    //    project_description: 'qwer' }
    // ]

});

app.factory('NestedTrackService', function(){

        //first build the array
        var nestedTracks = [];

        //then populate it

        //build one object inside the array for each track_name
        for (i = 0; i < tracks.length; i++){
            nestedTracks.push({track: tracks[i].track_name});

            //And then give properties to that track object
            for (j = 0; j < projects.length; j++){
                while (nestedTracks[i].track_name == tracks[i].track_name) {
                    nestedTracks[i].project[j] = (projects[j]);
                    nestedTracks[i].project[j].description = (projects[j].project_description);
                }
            }
        }

    return nestedTracks;

});

//{
//    "tracks" : {
//        "competent communicator" : [
//            {"project" : "persuade with power", "description" : "how to persuade people"},
//            {"project":"talk about things", "description":"talk about things"}
//        ],
//        "track2" : [
//            {"project":"another project", "description":"this is it"},
//            {"project":"yet another", "description":"this is not"}
//        ]
//    }
//}

//var tracks = {
//        competent communicator : {
//        color: 'gray',
//        model: '1',
//        nOfDoors: 4
//        },
//    track2 : {
//        color: 'yellow',
//        model: '2',
//        nOfDoors: 4
//        };
//
//var jsonCars = JSON.stringify(cars);
