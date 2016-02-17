'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(){
        console.log("Hello from profile controller!");
    }
})();