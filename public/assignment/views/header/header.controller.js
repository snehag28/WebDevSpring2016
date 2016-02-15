'use strict';
(function (){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("HeaderController",HeaderController);

    function HeaderController(){
        console.log("Hello from header controller!");
    }
})();