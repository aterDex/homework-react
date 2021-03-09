const express = require('express')
const app = express()
const port = 8080
const host = '127.0.0.1'
const pathSt = '/static'

app.use(pathSt, function(req, res, next){
    if ('POST' != req.method){
        next()
    }else{
        req.method = 'GET'
        next()
    }
})
app.use(pathSt, express.static('static'));
app.listen(port, host)