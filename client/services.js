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

    var tracks = [];

    $http.get('/getTracks').then(function(response){
        tracks = response.data;
    });

    return tracks;


});

app.factory('ProjectService', function(){

    var projects = [];

    $http.get('/getProjects').then(function(response){
        projects = response.data;
    });

    return projects;



});

app.factory('NestedTrackService', function(){


    var tracks =
        [ { track_name: 'Competent Communicator' } , { track_name: 'Track Two' } ];
    var projects =
        [
            {
                track_name: 'Track One',
                project_name: 'Project One',
                project_description: 'talk about things'
            },
            {
                track_name: 'Track One',
                project_name: 'Project Two',
                project_description: 'talk about stuff'
            },
            {
                track_name: 'Track Two',
                project_name: 'a project',
                project_description: 'a description'
            }
        ];

    //declare the array
    var nestedTracks = [];

    //then populate it

    //build one object inside the array for each track
    for (i = 0; i < tracks.length; i++){
        nestedTracks.push({track: tracks[i].track_name});

        //And then give properties to that array
        for (j = 0; j < projects.length; j++){
            //First check the track name, and then give it all its projects/descriptions inside an array before moving to the next track object
            while (nestedTracks[i].track == projects[j].track_name) {
                nestedTracks[i].track.projects = {project: {proj_name: projects[j].project_name, proj_desc: projects[j].project_description}};
            }
        }
    }

    console.log(nestedTracks);
    return nestedTracks;

});

//End result should look like this:
nestedTracks = [
    {track: 'Track One',
        projects: [
            {project: {proj_name: 'First Project', proj_description: 'talk about things'}},
            {project: {proj_name: 'Second Project', proj_description: 'talk about stuff'}}
        ]
    },
    {track: 'Track Two',
        projects: [
            {project: {proj_name: 'Another Project', proj_description: 'shouting'}},
            {project: {proj_name: 'Last Project', proj_description: 'whispering'}}
        ]
    }
];


