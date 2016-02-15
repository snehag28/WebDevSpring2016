'use strict';
(function (){
    angular
        .module("FormBuilderApp",["ngRoute"])
        .controller("MainController", MainController);

    function MainController() {
        console.log("Hello from MainController!");
    }
})();