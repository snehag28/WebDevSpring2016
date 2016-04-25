'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
            UserService.logout()
                .then(
                    function (response) {
                        $location.url("/home");
                    },
                    function (err) {
                        $scope.err = err;
                    }
                );
        }
    }

})();