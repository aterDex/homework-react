import path from "path";

export default class GotService {
    url = "https://www.anapioficeandfire.com/api";

    async _getJson(p = "", prop = {}) {
        const pr = this._addProp(prop);
        const s = path.join(this.url, `${p}${pr ? `?${pr}` : ''}`);
        console.log(s);
        return fetch(s, {
            headers: {
                Accept: "application/vnd.anapioficeandfire+json; version=1"
            }
        })
            .then(data => {
                if (!data.ok) {
                    throw new Error(`result ${data.status}:${data.statusText} for url '${this.url}'`);
                }
                return data.json();
            })
    }

    _addProp(prop) {
        const pr = Object.entries(prop);
        if (pr) {
            return pr.reduce((x, y) => {
                if (y[1]) {
                    x.append(y[0], y[1]);
                }
                return x;
            }, new URLSearchParams()).toString();
        }
        return "";
    }

    async getRoot() {
        return this._getJson()
    }

    async getCharacters(prop) {
        const chs = await this._getJson("characters", prop);
        return chs.map(this._transformCharacter);
    }

    async getCharacter(num) {
        const chs = await this._getJson(`characters/${num}`);
        return this._transformCharacter(chs);
    }

    async getHouses(prop) {
        const chs = await this._getJson("houses", prop);
        return chs.map(this._transformHouse);
    }

    async getHouse(num) {
        const chs = await this._getJson(`houses/${num}`);
        return this._transformHouse(chs);
    }

    async getBooks(prop) {
        const chs = await this._getJson("books", prop);
        return chs.map(this._transformBook);
    }

    async getBook(num) {
        const chs = await this._getJson(`books/${num}`);
        return this._transformBook(chs);
    }


    _transformCharacter(char) {
        return {
            id: char.url.replace(/^.*\D(\d+)$/, "$1"),
            url: char.url,
            name: char.name ? char.name : "Unknown",
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}