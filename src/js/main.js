import * as flsFunctions from './modules/functions.js';
import {movieRating, movieImg, movieTitle} from './modules/elements.js';
flsFunctions.isWebp();

const params = {
    'apiKey': 'api_key=8d9b44db0c2dfcce1e041eeb333d135c',
    'link': 'https://api.themoviedb.org/3/',
    'pathImg': 'https://image.tmdb.org/t/p/w1280'

}

function getData() {
    fetch(`${params.link}discover/movie?sort_by=popularity.desc&${params.apiKey}`)
        .then(movies => {
            return movies.json();
        }).then(showMovies);
}
getData();

function showMovies(data) {
    let movies;

    for(let i = 0; i <data.results.length; i++) {
        movies = data.results[i]
    }
    console.log(movies);

}

