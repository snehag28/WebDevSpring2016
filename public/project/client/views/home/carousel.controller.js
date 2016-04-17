'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("CarouselController",CarouselController);

    function CarouselController($scope, $rootScope) {

        $(document).ready(function(){
            $('.carousel').carousel({
                interval: 4000
            })
        });
    }

})();