'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        $scope.logout = logout;
        console.log($rootScope.user);

        function logout() {
            UserService.logout()
                .then(
                    function (response) {
                        $rootScope.user = null;
                        $location.url("/home");
                    },
                    function (err) {
                        $scope.err = err;
                    }
                );
        }
    }

})();