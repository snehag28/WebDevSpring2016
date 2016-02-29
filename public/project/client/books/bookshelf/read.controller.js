'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("ReadController",ReadController);

    function ReadController($scope, $rootScope) {
        console.log("Hello from read controller!");

    }
})();