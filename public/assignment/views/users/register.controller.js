'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController(){
        console.log("Hello from register controller!");
    }
})();