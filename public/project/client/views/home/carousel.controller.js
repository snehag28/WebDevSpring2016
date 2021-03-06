'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("CarouselController",CarouselController);

    function CarouselController($scope, $rootScope, BooksOfMonthService) {

        $(document).ready(function(){
            $('.carousel').carousel({
                interval: 3000
            });

            $('.carousel').delay('500').slideDown(1200, function(){
                //setTimeout("$('#page-information').slideUp('slow');", 500);
            });
        });



        function init() {
            BooksOfMonthService
                .getBooksOfMonth()
                .then(
                    function(doc) {
                        $scope.book1 = doc.data[0];
                        $scope.book2 = doc.data[1];
                        $scope.book3 = doc.data[2];
                        $rootScope.booksOfMonth = doc.data;
                    }
                );
        }
        init();
    }

})();