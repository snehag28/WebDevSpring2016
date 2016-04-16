'use strict';
(function () {
    angular
        .module("BookApp")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController($scope,BookService,$routeParams,UserService,$location) {
        $scope.addToFollowList = addToFollowList;
        $scope.removeFromFollowList = removeFromFollowList;

        function init() {
            getUserDetails($routeParams.username);
        }
        init();

        function getUserDetails(username){
            UserService
                .findUserByUsername(username)
                .then(
                    function(doc){
                        if(doc){
                            $scope.userDetails = doc;
                            console.log("User ID"+$scope.userDetails._id)
                            getBooksForUser($scope.userDetails._id);
                        }
                    }
                )
        }

        function getBooksForUser(userId){
            console.log("in getBooksForUser:");
                BookService.findAllBooksForUser(userId)
                    .then(
                        function(doc) {
                            $scope.books = doc;
                            console.log($scope.books);
                        }
                    )
        }

        function addToFollowList(username){
            var currentUser = UserService.getUser();
            currentUser.following.push(username);
            UserService
                .updateUserById(currentUser._id, currentUser)
                .then(
                    function(doc){
                        if(doc){
                            UserService.setUser(doc);
                            UserService
                                .addToFollowerList(username,currentUser.username);
                        }
                    }
                );
            $location.url("/people");
        }

        function removeFromFollowList(username){
            var currentUser = UserService.getUser();
            var newFollowing = currentUser.following;
            var index = newFollowing.indexOf(username);
            if(index > -1){
                newFollowing.splice(index,1);
            }
            currentUser.following = newFollowing;

            UserService
                .updateUserById(currentUser._id, currentUser)
                .then(
                    function(doc){
                        if(doc){
                            UserService.setUser(doc);
                        }
                    }
                )
            $location.url("/people");
        }
    }
})();