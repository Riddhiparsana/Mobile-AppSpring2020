document.addEventListener("DOMContentLoaded", function () {
    var TMDB_KEY = "dc85d0c399b6a4a7b439f1cce232d66d";

    var movie1;
    var favorites = [];


    document.getElementById("searchView").style.display = "none";
    document.getElementById("favoritesView").style.display = "none";
    document.getElementById("search").onclick = getDemMovies;
    document.getElementById("favorite1").onclick = addToFavorites;

    function getFullPosterUrl(posterpath){
        let p1 = "https://image.tmdb.org/t/p/w300";
        return p1+posterpath;
    }

    function null_callback(obj){
        //This is where you would do the actual work with the movie JSON object you get back.
        movie1 = obj.results[0];
        console.log("\n HEY ITS MOVIE ONE \n");
        console.log(movie1);
        let path = getFullPosterUrl(movie1.poster_path);
        let title = movie1.title;
        let img = document.getElementById('test');
        let overview = movie1.overview;
        img.setAttribute("src",path);
        document.getElementById('title').innerHTML = title;
        document.getElementById('overview').innerHTML = overview;
        toggleSearchView();

    }

    function getDemMovies(){
        let movietitle = document.getElementById('mySearch').value;
        console.log(movietitle);
        getMovies(movietitle,null_callback);
    }

    function toggleSearchView() {
        var x = document.getElementById("searchView");
        if (x.style.display === "none") {
            document.getElementById("favoritesView").style.display = "none";
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    document.getElementById("favorite").onclick = toggleFavoritesView;

    function toggleFavoritesView() {

        document.getElementById("searchView").style.display = "none";
        var x = document.getElementById("favoritesView");
        if (x.style.display === "none") {
            document.getElementById("searchView").style.display = "none";
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        populateFavoritesView();
    }

    function addToFavorites(){
        let m = new Movie ();
        favorites.push(m);
        alert("added to favorites");
    }

    function populateFavoritesView(){
        let canvas = document.getElementById("favoritesView");
        if(favorites.length == 0){
            canvas.innerHTML = "No Favorites";
        }
        else{
            canvas.innerHTML = "";
            for(let i in favorites){
                canvas.innerHTML += favorites[i].getTitle() + ",";
            }
        }
    }
    

    function getMovies(title,callback){
        let p1 = "https://api.themoviedb.org/3/search/movie"
        let p2 = "?api_key=" + TMDB_KEY;
        let p3 = "&page=1&include_adult=false"
        let p4 = "&query=" + title;
        let url = p1 + p2 + p3 + p4;
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
});