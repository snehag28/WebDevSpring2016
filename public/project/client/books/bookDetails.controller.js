'use strict';
(function () {
    angular
        .module("BookApp")
        .controller("BookDetailsController", BookDetailsController);

    function BookDetailsController($scope,$rootScope) {
        console.log("Hello from book details controller!");
        console.log($rootScope.details);
    }
})();