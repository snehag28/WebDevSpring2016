'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("HomeController",HomeController);

    function HomeController(){
        console.log("Hello from home controller!");
    }
})();