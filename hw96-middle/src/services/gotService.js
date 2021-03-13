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
                    throw new Error(`result ${data.status}:${data.statusText} fro url '${this.url}'`);
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
        return this._getJson("characters", prop);
    }

    async getCharacter(num) {
        return this._getJson(`characters/${num}`);
    }
}