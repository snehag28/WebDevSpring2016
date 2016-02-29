'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("CurrentController",CurrentController);

    function CurrentController($scope, $rootScope) {
        console.log("Hello from current controller!");

    }

})();