'use strict';

const {JsonDB: JsonDB} = require('node-json-db');
const {Config: JsonConfigDB} = require('node-json-db/dist/lib/JsonDBConfig');
const express = require('express');
const path = require('path');
const {v4: uuidV4} = require('uuid');

const app = express();
const port = 3001;
const host = '127.0.0.1';

const optForStore = {
    root: path.join(__dirname, 'store'),
}

let db = new JsonDB(new JsonConfigDB("store/db", true, true, '/'));

app.get('/api/resto/menu', (req, res) => {
    res.send({menu: db.getData('/menu')});
})

app.get('/api/resto/menu/:id', (req, res) => {
    res.send(db.find('/menu', x => x.id == req.params.id));
})

app.post('/api/resto/buy', (req, res) => {
    let data = '';
    console.log(req.headers);
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        const order = {
            id: uuidV4(),
            items: JSON.parse(data),
            data: new Date()
        };
        db.push("/orders[]", order, true);
        res.status(200);
        res.end();
    })
})

app.listen(port, host);

console.log(`Start server on http://${host}:${port}`)