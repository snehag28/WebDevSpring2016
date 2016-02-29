(function(){
    $(init)

    var $genreTxt;
    var $searchGenreBtn;
    var $tbody;
    var searchURL = "https://www.googleapis.com/books/v1/volumes?q=subject:CATEGORY";

    function init(){
        $genreTxt = $("#genreTxt");
        $searchGenreBtn = $("#searchGenreBtn");
        $tbody=$("#contentTable tbody");

        $searchGenreBtn.click(searchGenre);
    }

    function searchGenre(){
        var genre = $genreTxt.val();
        var url = searchURL.replace("CATEGORY", genre);
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
})();
