'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("PeopleController",PeopleController);

    function PeopleController($scope, $rootScope) {
        console.log("Hello from People controller!");

    }

})();