'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, UserService) {
        $scope.logout = logout;

        function logout() {
            UserService.logout();
        }
    }

})();