'use strict';

function initStorage() {
    return {
        postData: async function (url, headers, body) {
            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: body
            });
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        },
        getResource: async function (url) {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            return await res.json();
        }
    }
}

export default initStorage;