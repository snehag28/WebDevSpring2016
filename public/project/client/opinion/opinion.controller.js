'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("OpinionController",OpinionController);

    function OpinionController($scope, $rootScope) {
        console.log("Hello from Opinion controller!");
    }

})();