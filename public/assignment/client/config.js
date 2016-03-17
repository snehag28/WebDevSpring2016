'use strict';
(function(){
    angular
        .module("FormBuilderApp",["ngRoute"])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                //controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                //controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                //controller: "ProfileController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                //controller: "LoginController",
                //controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                //controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                //controller: "FormController"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                //controller: "FieldController"
            })
            .when("/logout", {
                templateUrl: "views/home/home.view.html",
                //controller: "HomeController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();