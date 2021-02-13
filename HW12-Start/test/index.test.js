'use strict';

let counterPrompt = 0;
const answers = [1001, 'qqq', 3.4, 'ddd', 9.5]
const answers2 = ['Сколько фильмов вы уже посмотрели?',
    'Один из последних просмотренных фильмов?', 'На сколько оцените его?']
const answers3 = [0, 1, 2, 1, 2]

function prompt(text, def) {
    if (answers2[answers3[counterPrompt]] === text) {
        return answers[counterPrompt++];
    }
}

const assert = require('assert');
const tes = require('../index.js');
describe('index.js test', function () {
    it('Must be equals', function () {
        assert.deepStrictEqual(tes.films(prompt), {
            count: 1001,
            movies: {
                qqq: 3.4,
                ddd: 9.5
            },
            actors: {},
            genres: [],
            privat: false
        })
    });
});