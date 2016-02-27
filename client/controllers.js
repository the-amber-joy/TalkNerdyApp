
app.controller('LoginController', function () {
    console.log('UI Router seems to be working!');
    var login = this
        .message='Hello and things!'
});

app.controller('HomeController', ['$http', function ($http) {
    console.log("We're home!");
    var home = this;
    $http.get('/agenda').then(function(response){
        home.data = response.data;
        console.log('Meeting Data response: ', home.data)
    });
}]);

//This will get all speeches scheduled for the next meeting, to be shown on the Home page agenda
app.controller('SpeechAgendaController', ['$http', function ($http) {
   var speechAgenda = this;
    this.speechArray = [];
    $http.get('/speechAgenda').then(function(response){
        this.speechArray = response.data;
        console.log('SpeechArray Data response: ', speechArray.data)
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
        this.agendas = response.data;
        console.log(response.data);
    });
}]);
