'use strict';
(function(){
    angular
        .module("BookApp",["ngRoute"])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "client/views/home/home.view.html",
                //controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                //controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/bookshelf", {
                templateUrl: "client/views/books/bookshelf/bookshelf.view.html",
                //controller: "BookshelfController"
            })
            .when("/read", {
                templateUrl: "client/views/books/bookshelf/read.view.html",
                //controller: "BookshelfController"
            })
            .when("/current", {
                templateUrl: "client/views/books/bookshelf/current.view.html",
                //controller: "BookshelfController"
            })
            .when("/future", {
                templateUrl: "client/views/books/bookshelf/future.view.html",
                //controller: "BookshelfController"
            })
            .when("/people", {
                templateUrl: "client/views/users/people/people.view.html",
                //controller: "PeopleController"
            })
            .when("/userDetails/:username", {
                templateUrl: "client/views/users/people/publicProfile.view.html",
                //controller: "PeopleController"
            })
            .when("/followers", {
                templateUrl: "client/views/users/people/followers.view.html",
                //controller: "FollowerController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                //controller: "AdminController"
            })
            .when("/editor", {
                templateUrl: "client/views/editor/editor.view.html",
                //controller: "AdminController"
            })
            .when("/search", {
                templateUrl: "client/views/books/search.view.html",
                //controller: "AdminController"
            })
            .when("/search/:title", {
                templateUrl: "client/views/books/search.view.html",
                controller: "SearchController"
            })
            .when("/bookDetails/:id", {
                templateUrl: "client/views/books/bookDetails.view.html",
                //controller: "AdminController"
            })
            .when("/genre", {
                templateUrl: "client/views/genre/genre.view.html",
                //controller: "AdminController"
            })
            .when("/genre/:genreName", {
                templateUrl: "client/views/genre/genre.view.html",
                //controller: "AdminController"
            })
            .when("/author", {
                templateUrl: "client/views/authors/author.view.html",
                //controller: "AdminController"
            })
            .when("/author/:authorName", {
                templateUrl: "client/views/authors/author.view.html",
                //controller: "AdminController"
            })
            .when("/opinion", {
                templateUrl: "client/views/opinion/opinion.view.html",
                //controller: "AdminController"
            })
            .when("/booksOfMonth", {
                templateUrl: "client/views/opinion/BOM/booksOfMonth.view.html",
                //controller: "AdminController"
            })
            .when("/bom_1", {
                templateUrl: "client/views/opinion/BOM/bom_1.view.html",
                //controller: "AdminController"
            })
            .when("/bom_2", {
                templateUrl: "client/views/opinion/BOM/bom_2.view.html",
                //controller: "AdminController"
            })
            .when("/bom_3", {
                templateUrl: "client/views/opinion/BOM/bom_3.view.html",
                //controller: "AdminController"
            })
            .when("/userArticles", {
                templateUrl: "client/views/opinion/userArticles/userArticles.view.html",
                //controller: "AdminController"
            })
            .when("/submitUserArticle", {
                templateUrl: "client/views/opinion/userArticles/userArticleForm.view.html",
                //controller: "AdminController"
            })
            .when("/submitEditorial", {
                templateUrl: "client/views/editor/submitEditorial.view.html",
                //controller: "AdminController"
            })
            .when("/logout", {
                templateUrl: "client/views/home/home.view.html",
                //controller: "HomeController"
            })
            .when("/#myCarousel", {
                templateUrl: "client/views/home/home.view.html/#myCarousel",
                //controller: "HomeController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();