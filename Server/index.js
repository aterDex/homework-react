const express = require('express')
const app = express()
const port = 8080
const host = '127.0.0.1'
const pathSt = '/static'
const echoPath = '/echo'

app.use(pathSt, function (req, res, next) {
    if ('POST' != req.method) {
        next()
    } else {
        req.method = 'GET'
        next()
    }
})
app.use(pathSt, express.static('static'));
app.all(echoPath, (req, res) => {
    res.contentType(req.header("content-type"));
    res.flushHeaders();
    req.on('data', chunk => {
        console.log('' + chunk);
        res.write(chunk);
    })
    req.on('end', () => {
        res.end();
    })
})
app.listen(port, host)