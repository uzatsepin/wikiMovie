import * as flsFunctions from './modules/functions.js';
import {moviesInner, rootElement, scrollToTopBtn} from './modules/utils.js';
flsFunctions.isWebp();

const params = {
    'apiKey': 'api_key=8d9b44db0c2dfcce1e041eeb333d135c',
    'link': 'https://api.themoviedb.org/3/',
    'pathImg': 'https://image.tmdb.org/t/p/w1280'

}

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}
getMovies(`${params.link}discover/movie?sort_by=popularity.desc&${params.apiKey}&language=ru&region=ru`)

function colorRating(rating) {
    if(rating >= 7) {
        return 'good'
    } else {
        return 'bad'
    }
}

function showMovies(data) {
    moviesInner.innerHTML = '';
    const mainPath = 'https://image.tmdb.org/t/p/w1280';

    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie;
        const movieItem = document.createElement('div');
        movieItem.classList.add('movies__item');
        movieItem.innerHTML = `
            <div class="movie__rating movie__rating-${colorRating(vote_average)}">${vote_average}</div>
                <img class="movies__img" src="${mainPath}${poster_path}" alt="${title}" width="287" height="416">
                <div class="movie__info">
                    <a class="movie__title" href="#">${title}</a>
            </div>
        `
        moviesInner.appendChild(movieItem);
    })
}


function handleScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if ((rootElement.scrollTop / scrollTotal ) > 0.80 ) {
        scrollToTopBtn.classList.add("showBtn")
    } else {
        scrollToTopBtn.classList.remove("showBtn")
    }
}
document.addEventListener("scroll", handleScroll);

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
scrollToTopBtn.addEventListener('click', scrollToTop);


