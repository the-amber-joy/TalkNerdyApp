//CONTROLLERS FOR ADMIN VIEWS & FUNCTIONS

app.controller('RosterController', ['$scope','$http', function ($scope, $http) {
    console.log('Roster Controller Hit');
    var roster = this;

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

        //for(var i = 0; i < roster.people.length; i++){
        //
        //    var addOn = ' ';
        //    if(roster.people[i].isadmin == true){
        //        addOn = '<< Admin >>'
        //    }
        //    roster.people[i].displayLine = roster.people[i].first_name + " " + roster.people[i].last_name + " -- " + roster.people[i].role.charAt(0).toUpperCase() + roster.people[i].role.slice(1) + "  " + addOn;
        //}

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

    $scope.updateRoster = function (){
        roster.person = [
            {
                first_name: this.first_name,
                last_name: this.last_name,
                role: this.role
            }
        ];
        //$http.post('/manage_roster', roster.person)
    };
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

    manageMtg.reset = function(){
        manageMtg.theme = '';
        console.log('button clicked');
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