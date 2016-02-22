var app = angular.module('talkNerdyApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/");
    $stateProvider
        .state('login', {
            templateUrl: 'views/login.html',
            controller: 'loginController',
            controllerAs: 'login'
              })
                .state('my_speeches', {
                    templateUrl: 'views/my_speeches.html',
                    controller: 'SpeechHistory',
                    controllerAs: 'history'
                });
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

    app.controller('SpeechHistory', ['$http', function ($http) {
        var history=this
            .speeches = [];
        $http.get('/mySpeeches').then(function(response){
            this.speeches = response.data;
            console.log("please!");
    });
}]);

