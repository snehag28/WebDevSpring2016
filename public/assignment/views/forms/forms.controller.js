'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(){
        console.log("Hello from Form controller!");
    }
})();