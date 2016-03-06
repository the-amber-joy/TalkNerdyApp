//FACTORIES
app.factory('UserService', function(){

    var userInfo = {
        firstName: '',
        lastName: '',
        id: 0,
        isadmin: '',
        role: '',
        google_id: 0
    };

    return userInfo;
});

//DIRECTIVES
//app.directive("otcDynamic", function($compile){
//    return {
//        link: function(scope, element){
//            element.on("click", function(){
//                var template = "<div><label for='project.project_number'>Project {{project.project_number}}:</label><br><input type='text' ng-model='project.project_name' id='project.project_number' placeholder='Project Name'><br><textarea ng-model='project.project_description' id='project.project_number.description' placeholder'Project Description'></textarea></div>";
//                var linkFn = $compile(template);
//                var content = linkFn(scope);
//                element.append(content);
//            })
//        }
//    }
//});



