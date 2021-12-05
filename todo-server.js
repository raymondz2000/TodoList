
const http = require('http');
const fs = require("fs");
const { brotliDecompressSync } = require('zlib');
let listitem=[];

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner

const server = http.createServer(function (request, response) {
	console.log(request.url);
	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/todo.html"){
			//read the todo.html file and send it back
			fs.readFile("todo.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.write(data);
				response.end();
			});
		}else if(request.url === "/todo.js"){
			//read todo.js file and send it back
			fs.readFile("todo.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.write(data);
				response.end();
			});
		
		//Add any more 'routes' and their handling code here
		//e.g., GET requests for "/list", POST request to "/list"

		}else if(request.url === "/todo.css"){
			//read todo.css file and send it back
			
			fs.readFile("todo.css", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/css");
				response.write(data);
				response.end();
			});
		}
		else if(request.url === "/b.jpg"){
			//read jpg file and send it back
			fs.readFile("b.jpg", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "image/jpg");
				response.write(data);
				response.end();
			});
		}
		else if(request.url==="/list"){
			let data = listitem;
			response.statusCode = 200;
			response.setHeader("Content-Type", "application/json");
			response.end(JSON.stringify(data));
		}
		
		else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}

	}else if(request.method === "POST"){
		//any handling in here added
		 
		let data="";
		if(request.url==="/list"){
			request.on('data',(chunk) =>{
				data+=chunk;
			}).on('end',() =>{
				console.log("push")
				listitem.push(JSON.parse(data));
				console.log(listitem);	
				response.statusCode = 200;
				response.write("successfull add");
				response.end();
			});
		}
		else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
		

	}
	else if(request.method === "PUT"){
		 
		//any handling in here
		let data=[];
		if(request.url==="/list"){
			request.on('data',(chunk) =>{
				data=JSON.parse(chunk)
			}).on('end',() =>{
				console.log(" delete item:");
				console.log(data);
				//const filteredItems = listitem.filter(item => item !== data)
				listitem=data;
				response.statusCode = 200;
				response.write("successfull delete");
		    	response.end();
			}); 
		}
		else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
		
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');