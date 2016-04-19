'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("ChooseBomController",ChooseBomController);

    function ChooseBomController($scope, BooksOfMonthService) {
        $scope.selectedCount = 0;
        function init() {
            BooksOfMonthService
                .getAllBOMS()
                .then(
                    function(doc) {
                        console.log(doc);
                        $scope.boms = doc.data;
                        for( var i = 0; i < $scope.boms.length ; i++) {
                            if($scope.boms[i].publish == true){
                                $scope.selectedCount = $scope.selectedCount + 1;
                            }
                        }
                    }
                );
        }
        init();

        $scope.deleteBOM = deleteBOM;
        $scope.unselectBOM = unselectBOM;
        $scope.selectBOM = selectBOM;

        $scope.$on('$locationChangeStart', function( event ) {
            if($scope.selectedCount < 3 && $scope.boms.length >= 3){
                $scope.error = "Please select 3 books";
                event.preventDefault();
            }
        });

        function unselectBOM (id, book) {
            book.publish = false;
            BooksOfMonthService.
                updateBOM(id,book)
                .then(
                    function(response) {
                        BooksOfMonthService
                            .getAllBOMS()
                            .then(
                                function(doc) {
                                    $scope.boms = doc.data;
                                    $scope.selectedCount = $scope.selectedCount - 1;
                                }
                            );
                    }
                );
        }

        function selectBOM (id, book) {
            book.publish = true;
            BooksOfMonthService.
                updateBOM(id,book)
                .then(
                    function(response) {
                        BooksOfMonthService
                            .getAllBOMS()
                            .then(
                                function(doc) {
                                    $scope.boms = doc.data;
                                    $scope.selectedCount = $scope.selectedCount + 1;
                                }
                            );
                    }
                );
        }

        function deleteBOM(id, publishBool) {
            if(publishBool == true) {
                $scope.selectedCount = $scope.selectedCount - 1;
            }
            BooksOfMonthService.deleteBOM(id)
                .then(
                    function(response) {
                        BooksOfMonthService
                            .getAllBOMS()
                            .then(
                                function(doc) {
                                    $scope.boms = doc.data;
                                }
                            );
                    }
                );
        }
    }

})();