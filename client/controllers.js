//We will eventually have multiple controller files.

app.controller('HistoryController', ['$http', '$scope', function ($http, $scope) {
    $scope.history = [];
    $http.get('/history').then(function(response){
        $scope.tasks = response.data;
    });
}]);

app.controller('SelectHistoryController', ['$http', '$scope', function ($http, $scope) {
    $scope.oldHistory = [];
    $scope.getOldDates = function(){
        $http.post('/selectHistory', {startDate: $scope.startDate}).then(function (response) {
            $scope.oldHistory = response.data;
        });
    };
}]);