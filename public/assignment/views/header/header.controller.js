'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, $rootScope) {
        //console.log("Hello from header controller!");
        $scope.logout = logout;

        function logout() {
            //console.log("in logout!");
            $rootScope.user = null;
        }
    }

})();