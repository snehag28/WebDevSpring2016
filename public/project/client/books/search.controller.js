'use strict';
(function (){
    angular
        .module("BookApp")
        .controller("SearchController",SearchController);

    function SearchController($scope, $rootScope) {
        console.log("Hello from search controller!");

        $(init)

        var $bookTitleTxt;
        var $searchBookBtn;
        var $tbody;
        var searchURL = "https://www.googleapis.com/books/v1/volumes?q=TITLE&";

        function init(){
            $bookTitleTxt = $("#bookTitleTxt");
            $searchBookBtn = $("#searchBookBtn");
            $tbody=$("#contentTable tbody");

            $searchBookBtn.click(searchBook);
        }

        function searchBook(){
            var bookTitle = $bookTitleTxt.val();
            var url = searchURL.replace("TITLE", bookTitle);
            $.ajax({
                url: url,
                success: renderBookList
            });
        }

        function renderBookList(response){
            $tbody.empty();
            console.log(response);
            //var totalResults = response.totalResults;
            var books = response.items;

            for(var i=0; i<books.length; i++){
                var book = books[i];

                var id = book.id;
                var title = book.volumeInfo.title;
                var author = book.volumeInfo.authors;
                var poster = book.volumeInfo.imageLinks.thumbnail;
                console.log(poster);

                var $tr = $("<tr>");

                var $img = $("<img>")
                    .attr("src",poster)
                    .addClass("poster");
                var $td = $("<td>");
                $td.append($img);
                $tr.append($td);

                $td = $("<td>")
                    .append(title);
                $tr.append($td);

                $td = $("<td>").append(author);
                $tr.append($td);

                $tbody.append($tr);

            }
        }

    }

})();