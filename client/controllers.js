
app.controller('LoginController', function () {
    console.log('UI Router seems to be working!');
    var login = this
        .message='Hello and things!'
});

app.controller('indexController', ['UserService', function (UserService) {
    var index = this;
        index.things = UserService;
        //console.log('Index Role: ', UserService.role, UserService.isadmin);
}]);

app.controller('HomeController', ['$http', 'UserService', function ($http, UserService) {
    console.log("We're home!");
    var home = this;
    $http.get('/auth/currentUser').then(function(response){
        console.log('Current User: ', response.data);
        UserService.firstName= response.data.first_name;
        UserService.id = response.data.id;
        UserService.isadmin= response.data.isadmin;
        UserService.role = response.data.role;
        console.log('User Service --->', UserService);
        home.firstName = UserService.firstName;
        home.isadmin = UserService.isadmin;
        home.role = UserService.role;
    });
    $http.get('/agenda').then(function(response){
        home.data = response.data;
        console.log('Meeting Data response: ', home.data)
    });
}]);

//This will get all speeches scheduled for the next meeting, to be shown on the Home page agenda
app.controller('SpeechAgendaController', ['$http', function ($http) {
    var plannedSpeeches = this;
    $http.get('/speechAgenda').then(function(response){
        this.speechArray = response.data;
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

app.controller('PastController', ['$http', function ($http) {
    var past = this;
    $http.get('/pastAgendas').then(function(response){
        past.agendas = response.data;
        console.log('Past Agendas: ', past.agendas);

    });
}]);
