var app = angular.module('talkNerdyApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('/', {
        url: '/login',
        controller: 'loginController',
        controllerAs: 'login'
    });


    app.controller('mainController', function () {
        var main = this;
        main.sampleMessage = 'Angular hooked up';
        main.today = Date.now();
    });

    app.controller('loginController', function () {
        console.log('UI Router seems to be working!')
    });
}]);
