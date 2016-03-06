//app.controller('LoginController', function () {
//    console.log('UI Router seems to be working!');
//    var login = this
//        .message='Hello and things!'
//});

app.controller('indexController', ['$http', 'UserService', function ($http, UserService) {
    var index = this;
        index.things = UserService;
}]);


app.controller('HomeController', ['$http', '$scope', 'UserService', function ($http, $scope, UserService) {
    console.log("We're home!");
    var home = this;
    home.dateToday = Date.now();
    if(!UserService.id) {
        $http.get('/auth/currentUser').then(function (response) {
            console.log('Current User: ', response.data);
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
    });

    home.attending = function() {
        $scope.checkedIn = true;
        console.log('UserService:', UserService.google_id);
        $http.post('/checkin', {google_id : UserService.google_id});
    };
}]);

//This will get all speeches scheduled for the next meeting, to be shown on the Home page agenda
app.controller('SpeechAgendaController', ['$http', function ($http) {
    var plannedSpeeches = this;
    $http.get('/speechAgenda').then(function(response){
        plannedSpeeches.speechArray = response.data;
        //console.log('Scheduled Speeches: ', response.data)
    });
}]);

//This shows a logged-in user their own history of past speeches
app.controller('SpeechHistory', ['$http', '$scope', 'UserService', function ($http, $scope, UserService) {
    var history = this;

    $http.post('/mySpeeches', {google_id : UserService.google_id}).then(function(response){
        history.speeches = response.data; //this is an array of speeches already given
    });

    $http.post('/myRequests', {google_id : UserService.google_id}).then(function(response){
        history.requests = response.data; //this is an array of speeches not yet given
    });


}]);

app.controller('PastController', ['$http', function ($http) {
    var past = this;
    $http.get('/pastAgendas', {}).then(function(response){
        past.agendas = response.data;
    });
}]);


app.controller('RequestSpeechController', ['$http', '$scope', 'UserService', function ($http, $scope, UserService) {
    var requestSpeech = this;

    requestSpeech.data = {
        firstName: UserService.firstName,
        lastName: UserService.lastName,
        google_id: UserService.google_id
    };

    $http.get('/getTracks').then(function(response){
        console.log('tracks:', response.data);
        requestSpeech.tracks = response.data;
    });

    $http.get('/getProjects').then(function(response){
        console.log('projects:', response.data);
        requestSpeech.projects = response.data;
    });

    console.log('tracks:', requestSpeech.tracks);
    console.log('projects:', requestSpeech.projects);


    requestSpeech.resetForm = function(){
        requestSpeech.data = {};
    };

    requestSpeech.submitSpeech = function (){
        //console.log('data is:', $scope.data);
        $http.post('/requestSpeech', requestSpeech.data).then(function(request){
        });
        requestSpeech.submitted = true;
        requestSpeech.resetForm();
    };

}]);