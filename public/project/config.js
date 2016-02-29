'use strict';
(function(){
    angular
        .module("BookApp",["ngRoute"])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "client/home/home.view.html",
                //controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "client/users/register.view.html",
                //controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "client/users/profile.view.html",
                //controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "client/users/login.view.html",
                //controller: "LoginController"
            })
            .when("/admin", {
                templateUrl: "client/admin/admin.view.html",
                //controller: "AdminController"
            })
            .when("/logout", {
                templateUrl: "client/home/carousel.view.html",
                //controller: "HomeController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();