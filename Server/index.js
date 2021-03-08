const http = require('http')

const server = http.createServer(function (request, response) {
    console.dir(request.param)

    if (request.method == 'POST') {
        console.log('POST')

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end('{"a": 100}');
    } else {
        console.log('GET')
        var html = `
            <html>
                <body>
                   <h1>Empty</h1>
                </body>
            </html>`
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html)
    }
})

const port = 8080
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
