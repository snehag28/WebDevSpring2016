'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("BookshelfController",BookshelfController);

    function BookshelfController($scope, $rootScope) {
        console.log("Hello from Bookshelf controller!");

    }

})();