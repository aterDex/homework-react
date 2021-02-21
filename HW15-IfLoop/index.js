'use strict';

function films(lPrompt, lInfo) {
    const numberOfFilms = +lPrompt('Сколько фильмов вы уже посмотрели?', '');

    const personalMovieDB = {
        count: numberOfFilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };

    while (true) {
        const lastFilm0 = lPrompt('Один из последних просмотренных фильмов (Или слово Хватит, чтобы остановить это)?', '');
        if (lastFilm0 === 'Хватит') {
            break;
        }
        if (!lastFilm0 || lastFilm0.length === 0 || lastFilm0.length > 50) {
            continue;
        }
        personalMovieDB.movies[lastFilm0] = +lPrompt('На сколько оцените его?', '');
    }

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
    return personalMovieDB;
}

function webFilms() {
    return films(window.prompt)
}

// If we're running under Node,
if(typeof exports !== 'undefined') {
    exports.films = films;
}