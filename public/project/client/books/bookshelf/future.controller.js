'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("FutureController",FutureController);

    function FutureController($scope, $rootScope) {
        console.log("Hello from future controller!");

    }

})();