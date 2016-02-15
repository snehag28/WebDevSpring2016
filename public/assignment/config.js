'use strict';
(function(){
    angular
        .module("FormBuilderApp",["ngRoute"])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "profile.view.html",
                controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "login.view.html",
                controller: "LoginController"
            })
            .when("/admin", {
                templateUrl: "admin.view.html",
                controller: "AdminController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();