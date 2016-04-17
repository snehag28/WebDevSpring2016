'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope) {
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
        }
    }

})();