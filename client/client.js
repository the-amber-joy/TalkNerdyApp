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
        .state('manage_meetings', {
            url: '/home/manage_meetings',
            templateUrl: 'views/manage_meetings.html',
            controller: 'ManageMeetingController',
            controllerAs: 'manageMtg'
        });

    //$locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode(true);
}]);

//CONTROLLERS are now in client/controllers.js
//FACTORIES and any other services will be in client/services.js