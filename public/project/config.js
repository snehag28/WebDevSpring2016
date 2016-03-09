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
            .when("/bookshelf", {
                templateUrl: "client/books/bookshelf/bookshelf.view.html",
                //controller: "BookshelfController"
            })
            .when("/read", {
                templateUrl: "client/books/bookshelf/read.view.html",
                //controller: "BookshelfController"
            })
            .when("/current", {
                templateUrl: "client/books/bookshelf/current.view.html",
                //controller: "BookshelfController"
            })
            .when("/future", {
                templateUrl: "client/books/bookshelf/future.view.html",
                //controller: "BookshelfController"
            })
            .when("/people", {
                templateUrl: "client/users/people/people.view.html",
                //controller: "PeopleController"
            })
            .when("/followers", {
                templateUrl: "client/users/people/followers.view.html",
                //controller: "FollowerController"
            })
            .when("/login", {
                templateUrl: "client/users/login.view.html",
                //controller: "LoginController"
            })
            .when("/admin", {
                templateUrl: "client/admin/admin.view.html",
                //controller: "AdminController"
            })
            .when("/editor", {
                templateUrl: "client/editor/editor.view.html",
                //controller: "AdminController"
            })
            .when("/search", {
                templateUrl: "client/books/search.view.html",
                //controller: "AdminController"
            })
            .when("/bookDetails", {
                templateUrl: "client/books/bookDetails.view.html",
                //controller: "AdminController"
            })
            .when("/genre", {
                templateUrl: "client/genre/genre.view.html",
                //controller: "AdminController"
            })
            .when("/author", {
                templateUrl: "client/authors/author.view.html",
                //controller: "AdminController"
            })
            .when("/opinion", {
                templateUrl: "client/opinion/opinion.view.html",
                //controller: "AdminController"
            })
            .when("/booksOfMonth", {
                templateUrl: "client/opinion/booksOfMonth.view.html",
                //controller: "AdminController"
            })
            .when("/userArticles", {
                templateUrl: "client/opinion/userArticles.view.html",
                //controller: "AdminController"
            })
            .when("/logout", {
                templateUrl: "client/home/home.view.html",
                //controller: "HomeController"
            })
            .when("/myCarousel", {
                templateUrl: "client/home/home.view.html/myCarousel",
                //controller: "HomeController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();