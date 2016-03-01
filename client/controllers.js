app.controller('LoginController', function () {
    console.log('UI Router seems to be working!');
    var login = this
        .message='Hello and things!'
});

app.controller('indexController', ['UserService', function (UserService) {
    var index = this;
        index.things = UserService;
}]);

app.controller('HomeController', ['$http', 'UserService', function ($http, UserService) {
    console.log("We're home!");
    var home = this;
    if(!UserService.id) {
        $http.get('/auth/currentUser').then(function (response) {
            //console.log('Current User: ', response.data);
            UserService.firstName = response.data.first_name;
            UserService.lastName = response.data.last_name;
            UserService.id = response.data.id;
            UserService.isadmin = response.data.isadmin;
            UserService.role = response.data.role;
            UserService.google_id = response.data.google_id;
            //console.log('User Service --->', UserService);
            home.firstName = UserService.firstName;
            home.isadmin = UserService.isadmin;
            home.role = UserService.role;
        });
    }
    $http.get('/agenda').then(function(response){
        home.data = response.data;
        console.log('Meeting Data response: ', home.data)
    });
}]);

//This will get all speeches scheduled for the next meeting, to be shown on the Home page agenda
app.controller('SpeechAgendaController', ['$http', function ($http) {
    var plannedSpeeches = this;
    $http.get('/speechAgenda').then(function(response){
        plannedSpeeches.speechArray = response.data;
        console.log('Scheduled Speeches: ', response.data)
    });
}]);

//This shows a logged-in user their own history of past speeches
app.controller('SpeechHistory', ['$http', function ($http) {
    var history = this;
    $http.get('/mySpeeches').then(function(response){
        this.speeches = response.data;
    });
}]);

//This shows a logged-in user their own history of open speech requests
app.controller('MyRequests', ['$http', function ($http) {
    var openRequests = this;
    $http.get('/myRequests').then(function(response){
        this.myReqs = response.data;
    });
}]);


app.controller('PastController', ['$http', function ($http) {
    var past = this;
    $http.get('/pastAgendas').then(function(response){
        past.agendas = response.data;
    });
}]);

app.controller('RequestSpeechController', ['$http', '$scope', 'UserService', function ($http, $scope, UserService) {
    var request = this;

    console.log('userservice object:', UserService);
    $scope.speechTitle = ''; //Text Entry field
    $scope.speechBlurb = ''; //Text Entry field
    $scope.track = '?';  //This will need to be a dropdown
    $scope.project = '?'; //This will need to be a dropdown
    var firstName = UserService.firstName;
    var lastName = UserService.lastName;
    var google_id = UserService.google_id;

    var speechReqObject = {speechTitle: $scope.speechTitle, speechBlurb: $scope.speechBlurb, track: $scope.track, project: $scope.project, firstName: firstName, lastName: lastName, google_id: google_id};

    $scope.submitSpeech = function (){
        $http.post('/requestSpeech', speechReqObject);
        $scope.clearFields();
        //and then something to give user the message that their request was submitted
    };

    $scope.clearFields = function() {
        console.log('Request submitted');
    };

}]);