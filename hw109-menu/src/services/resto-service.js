import path from "path";

export default class RestoService {

    url = "/api/resto";

    async getJson(p = "", prop = {}) {
        const pr = this.addProp(prop);
        const s = path.join(this.url, `${p}${pr ? `?${pr}` : ''}`);
        console.log("get", s);
        return fetch(s)
            .then(data => {
                if (!data.ok) {
                    throw new Error(`result ${data.status}:${data.statusText} for url '${s}'`);
                }
                return data.json();
            })
    }

    async postJson(p = "", prop = {}, jsonBody) {
        const pr = this.addProp(prop);
        const s = path.join(this.url, `${p}${pr ? `?${pr}` : ''}`);
        console.log("post", s);
        return fetch(s, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: jsonBody ? JSON.stringify(jsonBody) : null
        }).then(data => {
            if (!data.ok) {
                throw new Error(`result ${data.status}:${data.statusText} for url '${s}'`);
            }
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


    async getMenuItems() {
        const obj = await this.getJson("/menu");
        return obj.menu;
    }

    async getItem(itemId) {
        return await this.getJson(`/menu/${+itemId}`);
    }

    async buy(items) {
        return await this.postJson('/buy', {}, items);
    }
}