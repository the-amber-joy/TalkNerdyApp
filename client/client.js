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
    });
    //$urlRouterProvider.html5Mode(true);
}]);


    app.controller('mainController', ['$scope', function ($scope) {
        //var main = this;
        $scope.sampleMessage = 'Angular hooked up';
        $scope.today = Date.now();
    }]);

    app.controller('loginController', function () {
        console.log('UI Router seems to be working!')
        var login=this
            .message="Hello and things!"
    });



