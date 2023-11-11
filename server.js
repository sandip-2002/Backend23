// server creation

// 1. http module
const http=require('http');
const fs=require('fs');
const _= require('lodash-node');
const server=http.createServer((req,res)=>{
    // console.log('request has been made');
    // console.log(req.method);
    // console.log(req.url);
    // res.setHeader('Content-Type','text/html');
    // res.write('Hello sandip');
    // res.end();
    let path='./views';
    switch(req.url){
        case '/':
            path +='/index.html';
            res.statusCode=200;  
            break;
        case '/about':
            path +='/about.html';
            res.statusCode=200;
            break;
        default:
            path+='/404.html'
            res.statusCode=400;
            break;
    }
    console.log(path);
    fs.readFile(path,(err, fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.writeHead(res.statusCode, { 'Content-Type': 'text/html' });
            res.end(fileData);
        }
    })
})

//port no., host, callback func
server.listen(3000,'localhost',()=>{
    console.log('server is listening on port 3000')
})