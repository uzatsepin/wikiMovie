export const moviesInner = document.querySelector('.movies__inner');
export const rootElement = document.documentElement
export const scrollToTopBtn = document.querySelector('.scrollToTopBtn')

//Search Form
export const form = document.querySelector("form");
export const search = document.querySelector(".header__input");

//Navigation button
export const nextBtn = document.querySelector('.page-right');
export const prevBtn = document.querySelector('.page-left');
export const page = document.querySelector('.current-page');

export const noFilm = document.querySelector('.movies__nofilm');

export function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
export function handleScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if ((rootElement.scrollTop / scrollTotal ) > 0.05 ) {
        scrollToTopBtn.classList.add("showBtn")
    } else {
        scrollToTopBtn.classList.remove("showBtn")
    }
}

export function getImg(posterPath, mainPosterPath) {
    if(!posterPath) {
        return './img/no-image.jpg'
    } else {
        return `https://image.tmdb.org/t/p/w1280${mainPosterPath}`;
    }
}

export function colorRating(rating) {
    if(rating >= 7) {
        return 'good'
    } else {
        return 'bad'
    }
}

export function updatePageCounter(currentPage){
    page.innerHTML = currentPage;
    prevBtn.disabled = false;
}