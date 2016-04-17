'use strict';
(function(){
    angular
        .module("BookApp",["ngRoute"])
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "client/views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
                //controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                //controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/bookshelf", {
                templateUrl: "client/views/books/bookshelf/bookshelf.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
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
            .when("/member", {
                templateUrl: "client/views/users/people/searchPeople.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
                //controller: "PeopleController"
            })
            .when("/member/:name", {
                templateUrl: "client/views/users/people/searchPeople.view.html"
                //controller: "PeopleController"
            })
            .when("/userDetails/:username", {
                templateUrl: "client/views/users/people/publicProfile.view.html",
                //controller: "PeopleController"
            })
            .when("/followers", {
                templateUrl: "client/views/users/people/followers.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
                //controller: "FollowerController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
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
            .when("/myCarousel", {
                templateUrl: "client/views/home/home.view.html#myCarousel",
                //controller: "HomeController"
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkCurrentUser ($q, $http, $rootScope) {

            var deferred = $q.defer();

            $http.get('/api/project/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.user = user;
                }
                deferred.resolve();
            });

            return deferred.promise;
        }

        function checkLoggedin ($q, $http, $location, $rootScope)
        {
            //console.log("in checkLoggedin");
            var deferred = $q.defer();

            $http.get('/api/project/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.user = user;
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    $rootScope.errorMessage = 'You need to log in.';
                    deferred.reject();
                    $location.url('/login');
                }
            });

            return deferred.promise;
        }

        function checkAdmin ($q, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/project/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0' && user.role == "admin")
                {
                    $rootScope.user = user;
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    deferred.reject();
                    $location.url('/login');
                }
            });

            return deferred.promise;
        }
    }
})();