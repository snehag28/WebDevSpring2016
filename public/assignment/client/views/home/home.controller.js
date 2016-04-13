'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("HomeController",HomeController);

    function HomeController(){

        // console.log("Home Params: " + $route.current.params);

        console.log("in homecontroller");
    }
})();