//We will eventually have multiple controller files.

//app.controller('SpeechHistory', ['$http', '$scope', function ($http, $scope) {
//    $scope.speeches = [];
//    $http.get('/mySpeeches').then(function(response){
//        $scope.speeches = response.data;
//    });
//}]);

//app.controller('SelectHistoryController', ['$http', '$scope', function ($http, $scope) {
//    $scope.oldHistory = [];
//    $scope.getOldDates = function(){
//        $http.post('/selectHistory', {startDate: $scope.startDate}).then(function (response) {
//            $scope.oldHistory = response.data;
//        });
//    };
//}]);