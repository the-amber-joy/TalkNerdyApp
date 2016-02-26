var app = angular.module('talkNerdyApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider,
$urlRouterProvider, $locationProvider) {

    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/");
    $stateProvider
        .state('admin_sidebar', {
            url: '/admin_sidebar',
            templateUrl: 'views/admin_sidebar.html',
            controller: 'NavController',
            controllerAs: 'nav'
        })
        .state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
        })
        .state('home', {
            url: '/index',
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('my_speeches', {
            url: '/home/my_speeches',
            templateUrl: 'views/my_speeches.html',
            controller: 'SpeechHistory',
            controllerAs: 'history'
        })
        .state('past_agendas', {
            url: '/home/past_agendas',
            templateUrl: 'views/past_agendas.html',
            controller: 'PastController',
            controllerAs: 'past'
        })
        .state('manage_roster', {
            url: '/home/manage_roster',
            templateUrl: '/views/admin/manage_roster.html',
            controller: 'RosterController',
            controllerAs: 'roster'
        })
        .state('manage_mtgs', {
            url: '/home/manage_mtgs',
            templateUrl: 'views/manage_mtgs.html',
            controller: 'ManageMeetingController',
            controllerAs: 'manageMtg'
        });

    //$locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode(true);
}]);

    //app.controller('mainController', ['$scope', function ($scope) {
    //    //var main = this;
    //    $scope.sampleMessage = 'Angular hooked up';
    //    $scope.today = Date.now();
    //}]);

app.controller('LoginController', function () {
    console.log('UI Router seems to be working!');
    var login = this
        .message='Hello and things!'
});

app.controller('HomeController', ['$http', function ($http) {
    console.log("We're home!");
    var home=this;
    $http.get('/agenda').then(function(response){
        home.data = response.data;
        console.log('Meeting Data response: ', home.data)
    });
}]);

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

app.controller('RosterController', ['$http', function ($http) {
    var roster = this;
    $http.get('/manage_roster').then(function(response){
        this.people = response.data;
        console.log('Roster Controller Hit');
    });
}]);

app.controller('ManageMeetingController', ['$scope', '$http', function ($scope, $http) {
    var manageMtg = this;

    //This call grabs all the open speech requests which which do not have assigned dates yet
    $http.get('/manageMtg').then(function(response){
        this.agendas = response.data;
        console.log(response.data);
    });

    //This function/call send the create or edited meeting data back to the server/database
    $scope.manageMeeting = function(){
        var meetingData = {
            date: this.date,
            theme: this.theme,
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
}]);