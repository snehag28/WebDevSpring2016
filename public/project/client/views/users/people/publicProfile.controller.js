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
                        if(doc.data){
                            $scope.userDetails = doc.data;
                            getBooksForUser($scope.userDetails._id);
                        }
                    }
                )
        }

        function getBooksForUser(userId){
                BookService.findAllBooksForUser(userId)
                    .then(
                        function(doc) {
                            $scope.books = doc;
                            for(var i = 0, len = $scope.books.length; i < len; i++ ) {
                                var userIndex = arrayObjectIndexOf($scope.books[i].userShelf, userId, "userId");
                                var currUserShelf = {};
                                if(userIndex != -1){
                                    currUserShelf = $scope.books[i].userShelf[userIndex];
                                }
                                $scope.books[i].currentUserShelf = currUserShelf;
                            }
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
                            UserService.setUser(doc.data);
                            addToFollowedList(username,currentUser.username);
                        }
                    }
                );
            $location.url("/people");
        }

        function addToFollowedList (followed, follower) {
            UserService.
            findUserByUsername(followed)
                .then(
                    function(doc) {
                        doc.data.followers.push(follower);
                        UserService.
                            updateUserById(doc.data._id, doc.data)
                            .then(
                                function(doc) {
                                    //do nothing
                                }
                            );
                    }
                );
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
                            UserService.setUser(doc.data);
                            removeFromFollowedList(username,doc.data.username)
                        }
                    }
                );
            $location.url("/people");
        }

        function removeFromFollowedList (followed, follower) {
            UserService.
                findUserByUsername(followed)
                .then(
                    function(doc) {
                        var followerArray = doc.data.followers;
                        var index = followerArray.indexOf(follower);
                        if(index > -1){
                            followerArray.splice(index,1);
                        }
                        doc.data.followers = followerArray;
                        UserService.
                            updateUserById(doc.data._id, doc.data)
                            .then(
                                function(doc) {
                                    //do nothing
                                }
                            );
                    }
                );
        }

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }
    }
})();