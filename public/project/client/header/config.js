'use strict';
(function(){
    angular
        .module("BookApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "client/home/carousel.view.html",
                    //controller: "HomeController"
                })
                .when("/home", {
                    templateUrl: "client/home/carousel.view.html",
                    //controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "client/users/profile.view.html",
                    //controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "client/admin/admin.view.html",
                    //controller: "AdminController"
                })
                .when("/register",{
                    templateUrl: "client/users/register.view.html",
                    //controller: "RegisterController"
                })
                .when("/login",{
                    templateUrl: "client/login/login.view.html",
                    //controller: "LoginController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
