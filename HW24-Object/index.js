'use strict';

function films(lPrompt, lInfo) {
    const personalMovieDB = {
        count: 0,
        movies: {},
        actors: {},
        genres: [],
        privat: false,
        lPrompt: null,
        lInfo: null,
        addFilms: function () {
            for (; ;) {
                const lastFilm0 = this.lPrompt('Один из последних просмотренных фильмов (Или слово Хватит, чтобы остановить это)?', '');
                if (lastFilm0 === 'Хватит') {
                    break;
                }
                if (!lastFilm0 || lastFilm0.length === 0 || lastFilm0.length > 50) {
                    continue;
                }
                personalMovieDB.movies[lastFilm0] = +this.lPrompt('На сколько оцените его?', '');
            }
        },
        start: function () {
            this.count = +this.lPrompt('Сколько фильмов вы уже посмотрели?', '');
        },
        sayResult: function () {
            if (personalMovieDB.count < 0) {
                this.lInfo('Произошла ошибка');
            } else if (personalMovieDB.count < 10) {
                this.lInfo('Просмотрено довольно мало фильмов');
            } else if (personalMovieDB.count < 30) {
                this.lInfo('Вы классический зритель');
            } else if (personalMovieDB.count >= 30) {
                this.lInfo('Вы киноман');
            } else {
                this.lInfo('Произошла ошибка');
            }
        }
    };

    personalMovieDB.lInfo = lInfo;
    personalMovieDB.lPrompt = lPrompt;
    personalMovieDB.start()
    personalMovieDB.addFilms();
    personalMovieDB.sayResult();
    return personalMovieDB;
}

function webFilms() {
    personalMovieDB.lPrompt = window.prompt;
    personalMovieDB.lInfo = window.alert;
}

// If we're running under Node,
if (typeof exports !== 'undefined') {
    exports.films = films;
}