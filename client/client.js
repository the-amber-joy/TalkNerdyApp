var app = angular.module('talkNerdyApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider,
$urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('admin_sidebar', {
            url: '/admin_sidebar',
            templateUrl: 'views/sidebar.html',
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
        .state('request_speech', {
            url: '/home/request_speech',
            templateUrl: 'views/request_speech.html',
            controller: 'RequestSpeechController',
            controllerAs: 'requestSpeech'
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
        .state('manage_tracks', {
            url: '/home/manage_tracks',
            templateUrl: '/views/admin/manage_tracks.html',
            controller: 'TrackController',
            controllerAs: 'manageTracks'
        })
        .state('view_tracks', {
            url: '/home/view_tracks',
            templateUrl: '/views/view_tracks.html',
            controller: 'ViewTracksController',
            controllerAs: 'viewTracks'
        })
        .state('manage_meetings', {
            url: '/home/manage_meetings',
            templateUrl: 'views/manage_meetings.html',
            controller: 'ManageMeetingController',
            controllerAs: 'manageMtg'
        })
        .state('pending_speeches', {
            url: '/home/pending_speeches',
            templateUrl: 'views/pending_speeches.html',
            controller: 'ManageMeetingController',
            controllerAs: 'manageMtg'
        });


    $locationProvider.html5Mode(true);
}]);


//CONTROLLERS for all general views are in client/controllers.js
//CONTROLLERS for all ADMIN-specific functions are in client/adminControllers.js
//FACTORIES and any other services will be in client/services.js

