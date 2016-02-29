'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("CarouselController",CarouselController);

    function CarouselController($scope, $rootScope) {
        console.log("Hello from CarouselController controller!");

        $(document).ready(function(){
            $('.carousel').carousel({
                interval: 4000
            })
        });
    }

})();