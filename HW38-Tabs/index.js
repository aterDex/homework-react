const {JsonDB: JsonDB} = require('node-json-db');
const {Config: JsonConfigDB} = require('node-json-db/dist/lib/JsonDBConfig');
const {v4: uuidV4} = require('uuid');

const express = require('express')
const path = require('path')

const app = express()
const port = 8080
const host = '127.0.0.1'

const optForStore = {
    root: path.join(__dirname, 'store'),
}

let db = new JsonDB(new JsonConfigDB("store/request", true, true, '/'));


app.use(express.static('public'));

app.post('/callMe', (req, res) => {
    let data = '';
    console.log(req.headers);
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        const json = JSON.parse(data);
        json.id = uuidV4();
        json.data = new Date();
        db.push("/requests/data[]", json, true);
        res.json(json)
        res.end();
    })
});

app.get('/menu', (req, res) => {
    res.sendFile('menu.json', optForStore);
})

app.listen(port, host);
