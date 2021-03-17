import path from "path";

export default class GotService {
    url = "https://www.anapioficeandfire.com/api";

    async getJson(p = "", prop = {}) {
        const pr = this.addProp(prop);
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

    addProp(prop) {
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
        return this.getJson()
    }

    async getCharacters(prop) {
        const chs = await this.getJson("characters", prop);
        return chs.map(x => this.transformCharacter(x));
    }

    async getCharacter(num) {
        const chs = await this.getJson(`characters/${num}`);
        return this.transformCharacter(chs);
    }

    async getHouses(prop) {
        const chs = await this.getJson("houses", prop);
        return chs.map(x => this.transformHouse(x));
    }

    async getHouse(num) {
        const chs = await this.getJson(`houses/${num}`);
        return this.transformHouse(chs);
    }

    async getBooks(prop) {
        const chs = await this.getJson("books", prop);
        return chs.map(x => this.transformBook(x));
    }

    async getBook(num) {
        const chs = await this.getJson(`books/${num}`);
        return this.transformBook(chs);
    }


    transformCharacter(char) {
        return this._ems({
            id: char.url.replace(/^.*\D(\d+)$/, "$1"),
            url: char.url,
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        });
    }

    transformHouse(house) {
        return this._ems({
            id: house.url.replace(/^.*\D(\d+)$/, "$1"),
            url: house.url,
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        });
    }

    transformBook(book) {
        return this._ems({
            id: book.url.replace(/^.*\D(\d+)$/, "$1"),
            url: book.url,
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        });
    }

    _ems(obj) {
        Object.entries(obj).forEach(x => obj[x[0]] = this._em(x[1]));
        return obj;
    }

    _em(val) {
        if (val) {
            return val;
        } else {
            return "---";
        }
    }
}
