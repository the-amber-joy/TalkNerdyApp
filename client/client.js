var app = angular.module('talkNerdyApp', []);

app.controller('mainController', function(){
    var main = this;
    main.sampleMessage = 'Angular hooked up';
    main.today = Date.now();
});