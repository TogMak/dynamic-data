
//variables
const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 4000;

//Functions
//Syntax of a function
const someName = (name)=> {
    console.log("Your name is " + name)
}
someName("Togan Makzume")
const server = http.createServer((req, res) => {
    console.log(req.url)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./public/home.html' , (error,content) => {
    //We need to handle errors

    //If there are not errors, we can output the content 
    res.end(content)
  })
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 
