//FACTORIES
app.factory('UserService', function(){

    var userInfo = {
        firstName: '',
        lastName: '',
        id: 0,
        isadmin: '',
        role: '',
        google_id: 0,
        checkedIn: false
    };

    return userInfo;
});




