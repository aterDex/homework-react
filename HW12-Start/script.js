'use strict';

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

const lastFilm0 = prompt('Один из последних просмотренных фильмов?', ''),
      lastFilmRating0 = +prompt('На сколько оцените его?', ''),
      lastFilm1 = prompt('Один из последних просмотренных фильмов?', ''),
      lastFilmRating1 = +prompt('На сколько оцените его?', '');

personalMovieDB.movies[lastFilm0] = lastFilmRating0;
personalMovieDB.movies[lastFilm1] = lastFilmRating1;

console.log(personalMovieDB);