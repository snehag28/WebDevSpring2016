'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(){
        console.log("Hello from login controller!");
    }
})();