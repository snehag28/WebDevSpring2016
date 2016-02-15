'use strict';
(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/register",{
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login",{
                    templateUrl: "views/login/login.view.html",
                    controller: "LoginController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();

