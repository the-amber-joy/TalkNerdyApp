//app.controller('LoginController', function () {
//    console.log('UI Router seems to be working!');
//    var login = this
//        .message='Hello and things!'
//});

app.controller('indexController', ['UserService', function (UserService) {
    var index = this;
        index.things = UserService;
}]);

app.controller('HomeController', ['$http', 'UserService', function ($http, UserService) {
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
app.controller('SpeechHistory', ['$http', 'UserService', function ($http) {
    var history = this;
    $http.get('/mySpeeches').then(function(response){
        this.speeches = response.data;
    });
}]);

//This shows a logged-in user their own history of open speech requests
app.controller('MyRequests', ['$http', 'UserService', function ($http) {
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
    var requestSpeech = this;

    $scope.data = {
        firstName: UserService.firstName,
        lastName: UserService.lastName
    };

    $http.get('/getTracks').then(function(response){
        console.log('tracks:', response.data);
        $scope.tracks = response.data;
    });

    $http.get('/getProjects').then(function(response){
        console.log('projects:', response.data);
        $scope.projects = response.data;
    });

    $scope.resetForm = function(){
        $scope.data = {};
    };


    $scope.submitSpeech = function (){
        console.log('data is:', $scope.data);
        $http.post('/requestSpeech', $scope.data).then(function(request){
            console.log('data is:', $scope.data);
            //and then something to give user the message that their request was submitted
        });

        $scope.resetForm();
    };

}]);