class Movie{

    constructor(){
        this.title = document.getElementById('title').innerHTML
        this.overview = document.getElementById('overview').innerHMTL
        this.posterURL = document.getElementById('test').getAttribute("src");
    }
    
    
    getTitle(){
        return this.title;
    }
    
    getOverview(){
        return this.overview;
    }
    
    getURL(){
        return this.posterURL;
    }
    
}
    
        