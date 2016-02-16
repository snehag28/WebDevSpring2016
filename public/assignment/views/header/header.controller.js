'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController(){
        console.log("Hello from header controller!");
    }
})();