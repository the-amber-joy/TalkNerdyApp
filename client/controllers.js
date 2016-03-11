app.controller('indexController', ['$http', 'UserService', function ($http, UserService) {
    var index = this;
        index.things = UserService;
}]);


app.controller('HomeController', ['$http', '$scope', 'UserService', function ($http, $scope, UserService) {
    var home = this;
    home.things = UserService;
    home.dateToday = Date.now();

        $http.get('/auth/currentUser').then(function (response) {
            UserService.firstName = response.data.first_name;
            UserService.lastName = response.data.last_name;
            UserService.id = response.data.id;
            UserService.isadmin = response.data.isadmin;
            UserService.role = response.data.role;
            UserService.google_id = response.data.google_id;

            home.lastCheckIn = response.data.last_checkin;
            console.log('Last Checkin:', home.lastCheckIn);
            home.firstName = UserService.firstName;
            home.isadmin = UserService.isadmin;
            home.role = UserService.role;
        });


    $http.get('/agenda').then(function(response){
        home.data = response.data;
    });

    home.attending = function() {
        home.things.checkedIn = true;
        $http.post('/checkin', {google_id : UserService.google_id}).then(function (response) {
        });
        };

}]);

//This will get all speeches scheduled for the next meeting, to be shown on the Home page agenda
app.controller('SpeechAgendaController', ['$http', function ($http) {
    var plannedSpeeches = this;
    $http.get('/speechAgenda').then(function(response){
        plannedSpeeches.speechArray = response.data;
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

    var allTracks = [];

    $http.get('/getTracks').then(function(response){
        requestSpeech.tracks = response.data;
        allTracks = response.data;
    });

    requestSpeech.loadProjects = function(){
        $http.post('/getProjects', {track: requestSpeech.data.selectedTrack}).then(function(response){
            console.log('selected track', {track: requestSpeech.data.selectedTrack});
            requestSpeech.selectedProjects = response.data;
        });
    };

    requestSpeech.resetForm = function(){
        requestSpeech.data = {};
    };

    requestSpeech.submitSpeech = function (){
        $http.post('/requestSpeech', requestSpeech.data).then(function(request){
        });
        requestSpeech.submitted = true;
        requestSpeech.resetForm();
    };

    requestSpeech.deleteRequest = function(foo)

}]);

app.controller('ViewTracksController', ['$http', '$scope', function ($http) {
    var viewTracks = this;

    var allTracks = [];

    $http.get('/getTracks').then(function(response){
        viewTracks.tracks = response.data;
        allTracks = response.data;
    });


    viewTracks.loadProjects = function(){
        $http.post('/getProjects', allTracks[viewTracks.data.selectedTrack]).then(function(response){
            viewTracks.selectedProjects = response.data;
        });
    }

}]);