//CONTROLLERS FOR ADMIN VIEWS & FUNCTIONS

app.controller('RosterController', ['$scope','$http', function ($scope, $http) {
    console.log('Roster Controller Hit');
    var roster = this;
    roster.people = [];

    $http.get('/manage_roster').then(function (response) {
        roster.people = response.data;

        console.log('Response from Roster: ', roster.people);

        var i = 0;
        while (i < roster.people.length + 1) {
            if (i < roster.people.length) {
                console.log('Loop: ', i);
                var addOn = ' ';
                if (roster.people[i].isadmin == true) {
                    addOn = '<< Admin >>'
                }
                roster.people[i].displayLine = roster.people[i].first_name + " " + roster.people[i].last_name + " -- " + roster.people[i].role.charAt(0).toUpperCase() + roster.people[i].role.slice(1) + "  " + addOn;
                i++;
            } else {
                sortArray();
                console.log('STUFF Reached', roster.sortedArray);
                i++;
            }
        }
    });


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

    $scope.updateRoster = function () {
        roster.people.person =
        {

            first_name: this.first_name,
            last_name: this.last_name,
            role: this.role
        };

        //$http.post('/manage_roster', roster.person)
        //
        //        first_name: this.people.first_name,
        //        last_name: this.people.last_name,
        //        role: this.people.role,
        //        isAdmin: this.people.adminRole
        //    };
        console.log('roster.people.person:', roster.people.person);
        $http.post('/manage_roster', roster.people.person);
    }

}]);

app.controller('ManageMeetingController', ['$scope', '$http', function ($scope, $http) {
    var manageMtg = this;
    var meetingData = {};
    manageMtg.dateArray = [];

    //This call grabs all the open speech requests which which do not have assigned dates yet
    $http.get('/manageMtg').then(function (response) {
        this.agendas = response.data;
        console.log(response.data);
    });

    $http.get('/manageMtg/getDates').then(function (response) {
        manageMtg.dateArray = response.data;
    });

    //This function/call send the create or edited meeting data back to the server/database
    $scope.manageMeeting = function () {
        var meetingData = {
            date: manageMtg.date,
            theme: manageMtg.theme,
            location: this.location,
            word_of_day: this.word_of_day,
            presiding_officer: this.presiding_officer,
            toastmaster: this.toastmaster,
            general_evaluator: this.general_evaluator,
            table_topics_czar: this.table_topics_czar,
            speech_evaluator_1: this.speech_evaluator_1,
            speech_evaluator_2: this.speech_evaluator_2,
            speech_evaluator_3: this.speech_evaluator_3,
            grammarian: this.grammarian,
            ah_counter: this.ah_counter,
            timer: this.timer,
            description: this.description,
            speech_1: this.speech_1,
            speech_2: this.speech_2,
            speech_3: this.speech_3,
            speaker_1_firstName: this.speaker_1_firstName,
            speaker_1_lastName: this.speaker_1_lastName,
            speaker_2_firstName: this.speaker_2_firstName,
            speaker_2_lastName: this.speaker_2_lastName,
            speaker_3_firstName: this.speaker_3_firstName,
            speaker_3_lastName: this.speaker_3_lastName
        };

        $http.post('/manageMtg', meetingData)
    };

    //This is in process and may have to be moved to a separate controller
    $scope.resetSpeech = function () {
        var speechToReset = {
            speech_1: this.speech_1,
            speech_2: this.speech_2,
            speech_3: this.speech_3
        };

        $http.post('/resetSpeech', speechToReset);

    };

    manageMtg.reset = function(){
        manageMtg.theme = '';
        console.log('button clicked');
    };

}]);

//app.controller('TrackController', ['$scope','$http', function ($scope, $http) {
//    console.log('Track Controller Hit');
//
//    var tracks = this;
//
//    $http.get('/getTracks').then(function(response){
//        console.log('tracks:', response.data);
//        $scope.tracks = response.data;
//    });
//
//    $http.get('/getProjects').then(function(response){
//        console.log('projects:', response.data);
//        $scope.projects = response.data;
//    });
//
//    $http.get('/manage_tracks').then(function (response) {
//        tracks.stuff = response.data;
//        console.log('Response from Tracks Stuff: ', response);
//
//        $scope.addTracks = function () {
//            var newTracks = {
//                track_name: this.track_name,
//                project_name: this.project_name,
//                project_descripton: this.project_descripton
//            };
//
//            $http.post('/manage_tracks', newTracks);
//        };
//    });
//}]);
//
