'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("FeaturettesController",FeaturettesController);

    function FeaturettesController($scope, $rootScope) {
        console.log("Hello from FeaturettesController controller!");
    }

})();