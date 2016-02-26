var app = angular.module('talkNerdyApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider,
$urlRouterProvider, $locationProvider) {

    //
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/");
    $stateProvider
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
            templateUrl: '../server/public/views/admin/manage_roster.html',
            controller: 'RosterController',
            controllerAs: 'roster'
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
    var login=this
        .message='Hello and things!'
});

app.controller('HomeController', function () {
    console.log("We're home!");
});

app.controller('SpeechHistory', ['$http', function ($http) {
    var history=this;
    $http.get('/mySpeeches').then(function(response){
        history.speeches = response.data;
    });
}]);

app.controller('PastController', ['$http', function ($http) {
    var past=this;
    $http.get('/pastAgendas').then(function(response){
        past.agendas = response.data;
        console.log(response.data);
    });
}]);


app.controller('RosterController', [ function () {
    var roster=this;
    $http.get('/manage_roster').then(function(response){
        roster.people = response.data;
    });
    console.log('Roster Controller Hit');
}]);