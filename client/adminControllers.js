//CONTROLLERS FOR ADMIN VIEWS & FUNCTIONS

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||                    ROSTER CONTROLLER
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

app.controller('RosterController', ['$scope','$http', 'UserService', function ($scope, $http, UserService) {
    console.log('Roster Controller Hit');
    var roster = this;
    roster.people = [];

    roster.show_name_ack=false;
    roster.show_role_ack=false;

    fetchRoster();

    function fetchRoster() {
        $http.get('/manage_roster').then(function (response) {
            roster.people = response.data;

            //console.log('Response from Roster: ', roster.people);

            var i = 0;
            while (i < roster.people.length + 1) {
                if (i < roster.people.length) {
                    //console.log('Loop: ', i);
                    var addOn = ' ';
                    if (roster.people[i].isadmin == true) {
                        addOn = '<< Admin >>'
                    }
                    roster.people[i].displayLine = roster.people[i].first_name + " " + roster.people[i].last_name + " -- " + roster.people[i].role.charAt(0).toUpperCase() + roster.people[i].role.slice(1) + "  " + addOn;
                    i++;
                } else {
                    sortArray();
                    //console.log('STUFF Reached', roster.sortedArray);
                    i++;
                }
            }
        });
    }


        //######## Sort the final array alphabetical order #########
        function sortArray() {
                roster.people.sort(sortNames);
                //console.log(returnsArray);
                roster.sortedArray = roster.people;
            }


        //######### Sorting function ###########
        function sortNames(a, b) {
            //var nameA = a.first_name.toLowerCase(), nameB = b.last_name.toLowerCase();
            if (a.first_name < b.first_name){
                return -1;}
            if (a.first_name > b.first_name){
                return 1;}
            return 0;
        }

        //console.log('Response from Roster: ', response);

    roster.updateRoster = function(){

        roster.person =
        {
            isAdmin: $scope.isAdmin,
            hasRole: $scope.status,
            id: roster.sortedArray[$scope.userIndex].id
        };
        if(roster.person.isAdmin == undefined){roster.person.isAdmin = roster.sortedArray[$scope.userIndex].isadmin}
        if(roster.person.hasRole == undefined){roster.person.hasRole = roster.sortedArray[$scope.userIndex].role}


        $http.post('/manage_roster', roster.person).then(function(response){
            roster.show_role_ack=true;
            console.log(response);
            fetchRoster();
        });

        console.log("update Roster Function fired", $scope.status, $scope.isAdmin);
        document.getElementById("guestCheck").checked = false;
        document.getElementById("memberCheck").checked = false;
        document.getElementById("adminCheck").checked = false;
        $scope.isAdmin = false;

    };

    roster.updateName = function(){

        roster.person =
        {
            firstName: $scope.user_first_name,
            lastName: $scope.user_last_name,
            id: roster.sortedArray[$scope.userIndex].id
        };

        $http.post('/manage_roster/names', roster.person).then(function(response){
            roster.show_name_ack=true;
            console.log(response);
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
//+++++++++++++++++++++++++ End of ROSTER ++++++++++++++++++++++++++++++++++++


//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||                MANAGE MEETING CONTROLLER
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

app.controller('ManageMeetingController', ['$scope', '$http', function ($scope, $http) {
    var manageMtg = this;
    var meetingData = {};
    manageMtg.dateArray = [];

    $http.get('/getTracks').then(function(response){
        manageMtg.tracks = response.data;
    });

    $http.get('/getProjects').then(function(response){
        manageMtg.projects = response.data;
    });

    //This call grabs all the open speech requests that do not have assigned dates yet
    $http.get('/manageMtg/pendingRequests').then(function (response) {
        console.log('pending requests', response.data);
        manageMtg.pending = response.data;
    });

    //Return the dates for future meetings from the DB
    $http.get('/manageMtg/getDates').then(function (response) {
        manageMtg.dateArray = response.data;
    });

    //Send object to update DB on button click
    manageMtg.submitManagedMeetings = function () {

        manageMeeting();

        $http.post('/manageMtg/submitManagedMeeting', meetingData).then(function(response){
            console.log(response);
        });
        //and then something to give user the message that their request was submitted
    };

    $scope.fetchExistingFields = function(selectedDate) {
        var sendingDate={};
        var returnedFields={};

        sendingDate.date = selectedDate;
        console.log(sendingDate);
        $http.post('/manageMtg/fetchExisting', sendingDate).then(function(response){
            returnedFields = response.data;
            console.log('Here is the theme: ', returnedFields.theme);
            for(var objectKey in returnedFields) {
                if ((returnedFields[objectKey])) {
                    $scope[objectKey] = returnedFields[objectKey];
                } else {
                    $scope[objectKey] = null}

            }
        });
    };


    //Format object to include with ajax call to DB
    function manageMeeting() {
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
            description: $scope.description,
            speech_1: $scope.speech_1,
            speech_2: $scope.speech_2,
            speech_3: $scope.speech_3,
            speaker_1_firstname: $scope.speaker_1_firstName,
            speaker_1_lastname: $scope.speaker_1_lastName,
            speaker_2_firstname: $scope.speaker_2_firstName,
            speaker_2_lastname: $scope.speaker_2_lastName,
            speaker_3_firstname: $scope.speaker_3_firstName,
            speaker_3_lastname: $scope.speaker_3_lastName
        };

    }

        //    //$http.post('/manageMtg', meetingData);
        //};

        //This is in process and may have to be moved to a separate controller
        //$scope.resetSpeech = function () {
        //    var speechToReset = {
        //        speech_1: this.speech_1,
        //        speech_2: this.speech_2,
        //        speech_3: this.speech_3
        //    };
        //
        //    $http.post('/resetSpeech', speechToReset);
        //
        //};
    }]);
//+++++++++++++++++++++++++ End of MANAGE MEETING ++++++++++++++++++++++++++++


//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||                     TRACK CONTROLLER
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

app.controller('TrackController', ['$scope','$http', function ($scope, $http) {

    var manageTracks = this;

    manageTracks.showSubmitButton = false;
    manageTracks.success = false;

    var allTracks = [];

    $http.get('/getTracks').then(function(response){
        //console.log('tracks:', response.data);
        manageTracks.tracks = response.data;
        allTracks = response.data;
    });


    manageTracks.loadProjects = function(){
        $http.post('/getProjects', allTracks[manageTracks.selectedTrack]).then(function(response){
            manageTracks.selectedProjects = response;
        });
        manageTracks.showSubmitButton = true;
    };

    manageTracks.newTrack = {};

    manageTracks.changeTrack = function(){
        manageTracks.success = true;
        //console.log('request object:', $scope.newTrack);
        //$http.post('/manageTracks', manageTracks.newTrack).then(function(request){
        //});

    };



}]);
//+++++++++++++++++++++++++ End of TRACK ++++++++++++++++++++++++++++

