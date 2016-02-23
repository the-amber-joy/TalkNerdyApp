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
            controller: 'loginController',
            controllerAs: 'login'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController',
            controllerAs: 'home'
        })
        .state('my_speeches', {
            url: '/home/myspeeches',
            templateUrl: 'views/my_speeches.html',
            controller: 'SpeechHistory',
            controllerAs: 'history'
        })
        .state('past_agendas', {
            url: '/home/pastagendas',
            templateUrl: 'views/past_agendas.html',
            controller: 'PastController',
            controllerAs: 'past'
        });

    //$locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode(true);
}]);
    //app.controller('mainController', ['$scope', function ($scope) {
    //    //var main = this;
    //    $scope.sampleMessage = 'Angular hooked up';
    //    $scope.today = Date.now();
    //}]);

app.controller('loginController', function () {
    console.log('UI Router seems to be working!');
    var login=this
        .message='Hello and things!'
});

app.controller('homeController', function () {
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

