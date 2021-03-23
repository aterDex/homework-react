'use strict';

const {JsonDB: JsonDB} = require('node-json-db');
const {Config: JsonConfigDB} = require('node-json-db/dist/lib/JsonDBConfig');
const express = require('express');
const path = require('path');

const app = express();
const port = 3001;
const host = '127.0.0.1';

const optForStore = {
    root: path.join(__dirname, 'store'),
}

let db = new JsonDB(new JsonConfigDB("store/db", true, true, '/'));

app.get('/api/resto/menu', (req, res) => {
    res.sendFile('db.json', optForStore);
})

app.get('/api/resto/menu/:id', (req, res) => {
    res.send(db.find('/menu', x => x.id == req.params.id));
})

app.listen(port, host);

console.log(`Start server on http://${host}:${port}`)