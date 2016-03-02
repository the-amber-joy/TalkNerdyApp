//CONTROLLERS FOR ADMIN VIEWS & FUNCTIONS

app.controller('RosterController', ['$scope','$http', function ($scope, $http) {
    console.log('Roster Controller Hit');
    var roster = this;

    $http.get('/manage_roster').then(function (response) {
        roster.people = response.data;
        console.log('Response from Roster: ', response);
        });

    $scope.updateRoster = function (){
        roster.person = [
            {
                first_name: this.first_name,
                last_name: this.last_name,
                role: this.role
            }
        ];
        $http.post('/manage_roster', roster.person)
    };
}]);

app.controller('ManageMeetingController', ['$scope', '$http', function ($scope, $http) {
    var manageMtg = this;
    var meetingData = {};
    manageMtg.dateArray = [];

    //$scope. = {
    //
    //}

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
            speech_3: this.speech_3
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
    //clear button still needs work
    manageMtg.reset = function(){
        manageMtg.theme = '';
        console.log('button clicked');
    };

    // save button
    $scope.submitManagedMeetings = function () {
        $http.post('/submitManagedMeeting', $scope.data).then(function (request) {
            //and then something to give user the message that their request was submitted
        });
    };
}]);

app.controller('TrackController', ['$scope','$http', function ($scope, $http) {
    console.log('Track Controller Hit');

    var tracks = this;

    $http.get('/manage_tracks').then(function (response) {
        tracks.stuff = response.data;
        console.log('Response from Tracks Stuff: ', response);

        $scope.addTracks = function () {
            var newTracks = {
                track_name: this.track_name,
                project_name: this.project_name,
                project_descripton: this.project_descripton
            };

            $http.post('/manage_tracks', newTracks);
        };
    });
}]);