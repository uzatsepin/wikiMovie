import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

import {
    moviesInner,
    scrollToTopBtn,
    scrollToTop,
    handleScroll,
    getImg,
    colorRating,
    form,
    search,
    nextBtn,
    prevBtn,
    updatePageCounter,
    page,
    noFilm} from './modules/utils.js';

const params = {
    'apiKey': 'api_key=8d9b44db0c2dfcce1e041eeb333d135c',
    'link': 'https://api.themoviedb.org/3/',
    'imgPath': 'https://image.tmdb.org/t/p/w1280',
    'sortBy': [
        'popularity.desc',
        'vote_average.desc',
        'release_date.desc',
    ]
}
let currentPage = 1;

const URL = `${params.link}discover/movie?sort_by=popularity.desc&${params.apiKey}&language=ru&region=ru`;

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data);
}
getMovies(URL);

nextBtn.addEventListener('click', () => {
    currentPage++
    getMovies(`${params.link}discover/movie?sort_by=popularity.desc&${params.apiKey}&language=ru&region=ru&page=${currentPage}`);
    updatePageCounter(currentPage);
})
prevBtn.addEventListener('click', () => {
    if(currentPage <= 1) {
        prevBtn.disabled = true;
    } else if(currentPage > 1) {
        currentPage--
        updatePageCounter(currentPage);
    }
    getMovies(`${params.link}discover/movie?sort_by=popularity.desc&${params.apiKey}&language=ru&region=ru&page=${currentPage}`);
})


function showMovies(data) {
    moviesInner.innerHTML = '';
    data.results.splice(0,18).forEach(movie => {
        const {title, poster_path, vote_average} = movie;
        const movieItem = document.createElement('div');

        movieItem.classList.add('movies__item');
        movieItem.innerHTML = `
            <div class="movie__rating movie__rating-${colorRating(vote_average)}">${vote_average}</div>
                <img class="movies__img" src=${getImg(poster_path, poster_path)} alt="${title}" width="287" height="416">
                <div class="movie__info">
                    <a class="movie__title" href="#">${title}</a>
            </div>
        `
        moviesInner.appendChild(movieItem);

        const openModal = document.querySelectorAll('.movies__item');
        const modal = document.querySelector('.modal');

        openModal.forEach(item => {
            item.addEventListener('click', () => {
                modal.style.display = 'block'
            })
        })

        const modalClose = document.querySelector('.modal__close');
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none'
        })
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `https://api.themoviedb.org/3/search/movie?${params.apiKey}&query=${search.value}&language=ru`;
    if (search.value) {
        getMovies(apiSearchUrl);
    }
});

document.addEventListener("scroll", handleScroll);
scrollToTopBtn.addEventListener('click', scrollToTop);

