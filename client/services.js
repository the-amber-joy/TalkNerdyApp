app.factory('UserService', function(){

    var userInfo = {
        firstName: '',
        id: 0,
        isadmin: false,
        role: 'guest'
    };

    return userInfo;

});
