'use strict';
(function (){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("SidebarController",SidebarController);

    function SidebarController(){
        console.log("Hello from sidebar controller!");
    }
})();