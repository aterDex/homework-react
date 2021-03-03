'use strict';

// const assert = require('assert');
const sinon = require('sinon');
const tes = require('../index.js');
describe('index.js test', function () {
    it('test exit without film', function () {
        const prompt = sinon.stub();
        prompt.onCall(0).returns(0);
        prompt.withArgs('Один из последних просмотренных фильмов (Или слово Хватит, чтобы остановить это)?').returns('Хватит');
        assert.deepStrictEqual(tes.films(prompt, function () {
        }), {
            count: 0,
            movies: {},
            actors: {},
            genres: [],
            privat: false
        })
    });
    it('test films', function () {
        const prompt = sinon.stub();
        prompt.onCall(0).returns(100);
        prompt.onCall(1).returns('a');
        prompt.onCall(2).returns(5);
        prompt.onCall(3).returns('b');
        prompt.onCall(4).returns(-5);
        prompt.onCall(5).returns('c');
        prompt.onCall(6).returns(0);
        prompt.onCall(7).returns('d');
        prompt.onCall(8).returns(NaN);
        prompt.onCall(9).returns('e');
        prompt.onCall(10).returns('text');
        prompt.onCall(11).returns('Хватит');
        assert.deepStrictEqual(tes.films(prompt, function () {
        }), {
            count: 100,
            movies: {
                a: 5,
                b: -5,
                c: 0,
                d: NaN,
                e: NaN
            },
            actors: {},
            genres: [],
            privat: false
        })
    });
    [
        {countFilm: -1, text: 'Произошла ошибка'},
        {countFilm: 5, text: 'Просмотрено довольно мало фильмов'},
        {countFilm: 25, text: 'Вы классический зритель'},
        {countFilm: 31, text: 'Вы киноман'},
        {countFilm: NaN, text: 'Произошла ошибка'}
    ]
        .forEach(function (item) {
            it(`test count film: ${item.countFilm}`, function () {
                const spy = sinon.spy();
                const prompt = sinon.stub();
                prompt.onCall(0).returns(item.countFilm);
                prompt.withArgs('Один из последних просмотренных фильмов (Или слово Хватит, чтобы остановить это)?').returns('Хватит');
                assert.deepStrictEqual(tes.films(prompt, spy), {
                    count: item.countFilm,
                    movies: {},
                    actors: {},
                    genres: [],
                    privat: false
                })
                assert.strictEqual(spy.calledOnce, true)
                assert.strictEqual(spy.getCall(0).args[0], item.text)
            });
        });
    [
        {film: ''},
        {film: 'qqqwewqerwqwqeqwewqwewqewqewqeqwwredmnbdfjksfjdsfksjadfladsjofajsiofjisdf'},
        {film: null},
        {film: undefined}
    ]
        .forEach(function (item) {
            it(`test film name: ${item.film}`, function () {
                const spy = sinon.spy();
                const prompt = sinon.stub();
                prompt.onCall(0).returns(100)
                prompt.onCall(1).returns(item.film);
                prompt.onCall(2).returns('a');
                prompt.onCall(3).returns(5.6);
                prompt.onCall(4).returns('Хватит');
                assert.deepStrictEqual(tes.films(prompt, spy), {
                    count: 100,
                    movies: {a: 5.6},
                    actors: {},
                    genres: [],
                    privat: false
                })
                assert.strictEqual(spy.calledOnce, true)
            });
        });
});