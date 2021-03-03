'use strict';

function films(lPrompt, lInfo) {
    const personalMovieDB = {
        count: start(),
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };
    addFilms();
    sayResult();
    return personalMovieDB;

    function addFilms() {
        for (;;) {
            const lastFilm0 = lPrompt('Один из последних просмотренных фильмов (Или слово Хватит, чтобы остановить это)?', '');
            if (lastFilm0 === 'Хватит') {
                break;
            }
            if (!lastFilm0 || lastFilm0.length === 0 || lastFilm0.length > 50) {
                continue;
            }
            personalMovieDB.movies[lastFilm0] = +lPrompt('На сколько оцените его?', '');
        }
    }

    function start() {
        return +lPrompt('Сколько фильмов вы уже посмотрели?', '');
    }

    function sayResult() {
        if (personalMovieDB.count < 0) {
            lInfo('Произошла ошибка');
        } else if (personalMovieDB.count < 10) {
            lInfo('Просмотрено довольно мало фильмов');
        } else if (personalMovieDB.count < 30) {
            lInfo('Вы классический зритель');
        } else if (personalMovieDB.count >= 30) {
            lInfo('Вы киноман');
        } else {
            lInfo('Произошла ошибка');
        }
    }
}

function webFilms() {
    return films(window.prompt)
}

// If we're running under Node,
if(typeof exports !== 'undefined') {
    exports.films = films;
}