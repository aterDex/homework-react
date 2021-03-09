const express = require('express')
const app = express()
const port = 8080
const host = '127.0.0.1'

app.use(express.static('public'));

app.post('/callMe', (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        console.log(data);
        res.end();
    })
});

app.listen(port, host);
