'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("SearchPeopleController",SearchPeopleController);

    function SearchPeopleController($routeParams, UserService, $scope) {

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
                    $scope.users = doc.data;
                }
            );
        }
    }

})();