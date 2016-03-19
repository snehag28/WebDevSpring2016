'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, UserService) {
        $scope.logout = logout;

        function logout() {
            UserService.logout();
            console.log("in controller logout:");
            console.log($rootScope.user);
        }
    }

})();