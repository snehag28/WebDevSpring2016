'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("FollowerController",FollowerController);

    function FollowerController($scope, $rootScope) {
        console.log("Hello from Follower controller!");

    }

})();