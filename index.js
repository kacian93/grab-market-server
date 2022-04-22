var http = require('http');
var hostname = '127.0.0.1';
var port = 8080;

const server = http.createServer(function (req,res){
    const path = req.url;
    const method = req.method;
    if (path ==='/product'){
        if(method === 'GET'){
            res.writeHead(200,{'Content-Type':'application/json'});
                const product =JSON.stringify([{
                name:"basket ball",
                price: 50000,

            }]);
            res.end(product);
        }else if(method === 'POST'){
            res.end("success created")
        }
    }
    res.end('good bye')
});

server.listen(port,hostname);

console.log('grab market server on')
