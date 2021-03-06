//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//        CONTROLLERS FOR ADMIN VIEWS & FUNCTIONS            //
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//                  ROSTER CONTROLLER                        //
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

app.controller('RosterController', ['$scope','$http', 'UserService', function ($scope, $http, UserService) {
    var roster = this;
    roster.people = [];

    roster.show_name_ack=false;
    roster.show_role_ack=false;

    fetchRoster();

    function fetchRoster() {
        $http.get('/manage_roster').then(function (response) {
            roster.people = response.data;

            var i = 0;
            while (i < roster.people.length + 1) {
                if (i < roster.people.length) {

                    var addOn = ' ';
                    if (roster.people[i].isadmin == true) {
                        addOn = '<< Admin >>'
                    }
                    roster.people[i].displayLine = roster.people[i].first_name + " " + roster.people[i].last_name + " -- " + roster.people[i].role.charAt(0).toUpperCase() + roster.people[i].role.slice(1) + "  " + addOn;
                    i++;
                } else {
                sortArray();
                    i++;
                }
            }
        });
    }


        //######## Sort the final array in alphabetical order #########
        function sortArray() {
                roster.people.sort(sortNames);
                roster.sortedArray = roster.people;
            }


        //######### Sorting function ###########
        function sortNames(a, b) {
            if (a.first_name < b.first_name){
                return -1;}
            if (a.first_name > b.first_name){
                return 1;}
            return 0;
        }


    roster.updateRoster = function(){

        roster.person = {
            isAdmin: $scope.isAdmin,
            hasRole: $scope.status,
            id: roster.sortedArray[$scope.userIndex].id
        };


        if(roster.person.isAdmin == undefined){roster.person.isAdmin = roster.sortedArray[$scope.userIndex].isadmin}
        if(roster.person.hasRole == undefined){roster.person.hasRole = roster.sortedArray[$scope.userIndex].role}

        $http.post('/manage_roster', roster.person).then(function(response){
            roster.show_role_ack=true;
            fetchRoster();
        });


        document.getElementById("guestCheck").checked = false;
        document.getElementById("memberCheck").checked = false;
        document.getElementById("adminCheck").checked = false;
        $scope.isAdmin = false;
    };


    roster.updateName = function(){

        roster.person = {
            firstName: $scope.user_first_name,
            lastName: $scope.user_last_name,
            id: roster.sortedArray[$scope.userIndex].id
        };


        $http.post('/manage_roster/names', roster.person).then(function(response){
            roster.show_name_ack=true;
            fetchRoster();
        });
    };


    roster.loadName = function(){
        $scope.user_first_name = roster.sortedArray[$scope.userIndex].first_name;
        $scope.user_last_name = roster.sortedArray[$scope.userIndex].last_name;
        roster.show_name_ack=false;
        roster.show_role_ack=false;
    }
}]);


//+++++++++++++++++++++++++ End of ROSTER CONTROLLER +++++++++++++++++++++++++++


//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||                MANAGE MEETING CONTROLLER
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

app.controller('ManageMeetingController', ['$scope', '$http', function ($scope, $http) {
    var manageMtg = this;
    manageMtg.success = false;
    var meetingData = {};
    manageMtg.pending = [];  // array of unscheduled speeches
    manageMtg.speech1 = {};
    manageMtg.speech2 = {};
    manageMtg.speech3 = {};
    manageMtg.dateArray = [];
    manageMtg.scheduledSpeeches = [];

    $http.get('manageMtg/userList').then(function(response){
        manageMtg.users = response.data;
    });


    var getPendingSpeeches = function() {
        $http.get('/manageMtg/pendingRequests').then(function (response) {
            manageMtg.pending = response.data;
        });
    };

    //This call grabs all the open speech requests that do not have assigned dates yet
    getPendingSpeeches();


    //Return the dates for future meetings from the DB
    grabDates();

    function grabDates() {
        $http.get('/manageMtg/getDates').then(function (response) {
            manageMtg.dateArray = response.data;
        });
    }


    //Assigns date to pending speech & adds speech to queue
    manageMtg.scheduleSpeech = function (clickedSpeech){

        if ($scope.dateStart == undefined){
            alert("Please select a date first, or create a custom date.")
        } else {
            if (manageMtg.speech1.speech_title == undefined || manageMtg.speech1.speech_title == '') {

                manageMtg.pending[manageMtg.pending.indexOf(clickedSpeech)].speech_date = $scope.dateStart;
                manageMtg.speech1.speech_title = clickedSpeech.speech_title;
                manageMtg.speech1.track = clickedSpeech.track;
                manageMtg.speech1.track_project = clickedSpeech.track_project;
                manageMtg.speech1.speaker_first_name = clickedSpeech.speaker_first_name;
                manageMtg.speech1.speaker_last_name = clickedSpeech.speaker_last_name;
                manageMtg.speech1.summary = clickedSpeech.summary;
                manageMtg.speech1.id = clickedSpeech.id;
                manageMtg.pending.splice([manageMtg.pending.indexOf(clickedSpeech)], 1);

                $http.post('/scheduleSpeech', clickedSpeech).then(function(request){
                });

            } else if (manageMtg.speech2.speech_title == undefined || manageMtg.speech2.speech_title == '') {

                manageMtg.pending[manageMtg.pending.indexOf(clickedSpeech)].speech_date = $scope.dateStart;
                manageMtg.speech2.speech_title = clickedSpeech.speech_title;
                manageMtg.speech2.track = clickedSpeech.track;
                manageMtg.speech2.track_project = clickedSpeech.track_project;
                manageMtg.speech2.speaker_first_name = clickedSpeech.speaker_first_name;
                manageMtg.speech2.speaker_last_name = clickedSpeech.speaker_last_name;
                manageMtg.speech2.summary = clickedSpeech.summary;
                manageMtg.speech2.id = clickedSpeech.id;
                manageMtg.pending.splice([manageMtg.pending.indexOf(clickedSpeech)], 1);

                $http.post('/scheduleSpeech', clickedSpeech).then(function(request){
                });

            } else if (manageMtg.speech3.speech_title == undefined || manageMtg.speech3.speech_title == '') {

                manageMtg.pending[manageMtg.pending.indexOf(clickedSpeech)].speech_date = $scope.dateStart;
                manageMtg.speech3.speech_title = clickedSpeech.speech_title;
                manageMtg.speech3.track = clickedSpeech.track;
                manageMtg.speech3.track_project = clickedSpeech.track_project;
                manageMtg.speech3.speaker_first_name = clickedSpeech.speaker_first_name;
                manageMtg.speech3.speaker_last_name = clickedSpeech.speaker_last_name;
                manageMtg.speech3.summary = clickedSpeech.summary;
                manageMtg.speech3.id = clickedSpeech.id;
                manageMtg.pending.splice([manageMtg.pending.indexOf(clickedSpeech)], 1);

                $http.post('/scheduleSpeech', clickedSpeech).then(function(request){
                });

            } else {
                alert("Current meeting is full. Please select another date for this speech!")
            }
        };
    };

    //Resets speech date to NULL so it appears back in request queue
    manageMtg.oneToQueue = function(speechToReset){
        $http.post('/resetSpeech', speechToReset).then(function(request){
        }).then(
        manageMtg.speech1 = {
            speech_title: '',
            track_name: '',
            project_name: '',
            speaker_first_name: '',
            speaker_last_name: '',
            speech_blurb: '',
            id: 0
        }).then(
            getPendingSpeeches()
        );
    };

    manageMtg.twoToQueue = function(speechToReset){
        $http.post('/resetSpeech', speechToReset).then(function(request){
        }).then(
        manageMtg.speech2 = {
            speech_title: '',
            track_name: '',
            project_name: '',
            speaker_first_name: '',
            speaker_last_name: '',
            speech_blurb: '',
            id: 0
        }).then(
            getPendingSpeeches()
        );
    };

    manageMtg.threeToQueue = function(speechToReset){
        $http.post('/resetSpeech', speechToReset).then(function(request){
        }).then(
        manageMtg.speech3 = {
            speech_title: '',
            track_name: '',
            project_name: '',
            speaker_first_name: '',
            speaker_last_name: '',
            speech_blurb: '',
            id: 0
        }).then(
        getPendingSpeeches()
        );
    };

    //Format object to include with ajax call to DB
    var manageMeeting = function() {
        meetingData = {
            date: $scope.dateStart,
            theme: $scope.theme,
            location: $scope.location,
            word_of_day: $scope.word_of_day,
            presiding_officer: $scope.presiding_officer,
            toastmaster: $scope.toastmaster,
            general_evaluator: $scope.general_evaluator,
            table_topics_czar: $scope.table_topics_czar,
            speech_evaluator_1: $scope.speech_evaluator_1,
            speech_evaluator_2: $scope.speech_evaluator_2,
            speech_evaluator_3: $scope.speech_evaluator_3,
            grammarian: $scope.grammarian,
            ah_counter: $scope.ah_counter,
            timer: $scope.timer,
            description: $scope.description
        };
    }

    //Send object to update DB on button click
    manageMtg.submitManagedMeetings = function () {
        manageMeeting();
        $http.post('/manageMtg/submitManagedMeeting', meetingData).then(function(response){
        });
        manageMtg.success = true;
    };


    // Add a custom meeting date to the db
    manageMtg.submitCustomDate = function () {
        var addDate = {};
        addDate.date = manageMtg.customDate;
        $http.post('/manageMtg/submitCustomDate', addDate).then(function(response){
            manageMtg.customDate = null;
            grabDates();
        });
    };


    $scope.fetchExistingFields = function(selectedDate) {
        manageMtg.success = false;
        var sendingDate={};
        var returnedFields={};

        sendingDate.date = selectedDate;
        $http.post('/manageMtg/fetchExisting', sendingDate).then(function(response){
            returnedFields = response.data;
            for(var objectKey in returnedFields) {
                if ((returnedFields[objectKey])) {
                    $scope[objectKey] = returnedFields[objectKey];
                } else {
                    $scope[objectKey] = null}
            }
        });
    };


    $scope.fetchExistingSpeeches = function(selectedDate) {

        var sendingDate = {};
        var returnedSpeeches = [];

        sendingDate.date = selectedDate;

        $http.post('/manageMtg/fetchExistingSpeeches', sendingDate).then(function (response) {
            manageMtg.speech1 = {};
            manageMtg.speech2 = {};
            manageMtg.speech3 = {};

            returnedSpeeches = response.data;
            if(returnedSpeeches[0]) {
                manageMtg.speech1 = {
                    speech_title: returnedSpeeches[0].speech_title,
                    track: returnedSpeeches[0].track,
                    track_project: returnedSpeeches[0].track_project,
                    speaker_first_name: returnedSpeeches[0].speaker_first_name,
                    speaker_last_name: returnedSpeeches[0].speaker_last_name,
                    summary: returnedSpeeches[0].summary
                };
            }
            if(returnedSpeeches[1]) {
                manageMtg.speech2 = {
                    speech_title: returnedSpeeches[1].speech_title,
                    track: returnedSpeeches[1].track,
                    track_project: returnedSpeeches[1].track_project,
                    speaker_first_name: returnedSpeeches[1].speaker_first_name,
                    speaker_last_name: returnedSpeeches[1].speaker_last_name,
                    summary: returnedSpeeches[1].summary
                };
            }
            if(returnedSpeeches[2]) {
                manageMtg.speech3 = {
                    speech_title: returnedSpeeches[2].speech_title,
                    track: returnedSpeeches[2].track,
                    track_project: returnedSpeeches[2].track_project,
                    speaker_first_name: returnedSpeeches[2].speaker_first_name,
                    speaker_last_name: returnedSpeeches[2].speaker_last_name,
                    summary: returnedSpeeches[2].summary
                };
            }
            getPendingSpeeches();
        });
    }
}]);
//+++++++++++++++++++++++++ End of MANAGE MEETING ++++++++++++++++++++++++++++


//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//                              TRACK CONTROLLER                            //
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

app.controller('TrackController', ['$scope','$http', function ($scope, $http) {

    var manageTracks = this;
    var allTracks = [];
    manageTracks.selectedProjects = [];

    manageTracks.showSubmitButton = false;
    manageTracks.success = false;

    $http.get('/manageTracks').then(function(response){
        manageTracks.tracks = response.data;
        allTracks = response.data;
    });


    manageTracks.loadProjects = function(){
        $http.post('/getProjects', allTracks[manageTracks.selectedTrack]).then(function(response){
            manageTracks.selectedProjects = response.data;
        });
        manageTracks.showSubmitButton = true;
    };


    manageTracks.addProject = function() {
        var newProject = { track_name: allTracks[manageTracks.selectedTrack].track_name,
            project_name: '',
            project_description: '',
            project_number: manageTracks.selectedProjects.length+1,
            track_number: allTracks[manageTracks.selectedTrack].track_number
             };
        manageTracks.selectedProjects.push(newProject);
    };


    manageTracks.updateTrack = function(){

        $http.post('/manageTracks', manageTracks.selectedProjects);
        manageTracks.success = true;
    };
}]);

//+++++++++++++++++++++++++ End of TRACK ++++++++++++++++++++++++++++

