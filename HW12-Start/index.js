'use strict';

function films(lPrompt) {
    const numberOfFilms = +lPrompt('Сколько фильмов вы уже посмотрели?', '');

    const personalMovieDB = {
        count: numberOfFilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };

    const lastFilm0 = lPrompt('Один из последних просмотренных фильмов?', ''),
        lastFilmRating0 = +lPrompt('На сколько оцените его?', ''),
        lastFilm1 = lPrompt('Один из последних просмотренных фильмов?', ''),
        lastFilmRating1 = +lPrompt('На сколько оцените его?', '');

    personalMovieDB.movies[lastFilm0] = lastFilmRating0;
    personalMovieDB.movies[lastFilm1] = lastFilmRating1;

    return personalMovieDB;
}

function webFilms() {
    return films(window.prompt)
}

// If we're running under Node,
if(typeof exports !== 'undefined') {
    exports.films = films;
}