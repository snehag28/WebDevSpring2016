'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("SearchPeopleController",SearchPeopleController);

    function SearchPeopleController($routeParams, UserService, $scope) {
        console.log("Hello from SearchPeopleController controller!");

        function init() {
            var fname = $routeParams.name;
            if(fname) {
                getUsers(fname);
            }
        }
        init();

        function getUsers(fname){
            UserService.getUsersByName(fname).
                then(
                function(doc) {
                    $scope.users = doc;
                    console.log($scope.users);
                }
            );
        }
    }

})();