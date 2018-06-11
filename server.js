const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =  process.env.PORT || 4000;

/*var port = null;

try{
	port = process.env.PORT;
	console.log(port);
}catch(errorMessage){
	console.log(errorMessage);
}


if(typeof port != 'number'){
	console.log(port , ' is not a number number');
	try{
		port = 4000 ;
		console.log(port);
	}catch(errorMessage){
		console.log(errorMessage);
	}
}*/



var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view_engine', 'hbs');


// middleware
app.use((req, res, next) => {
	//if this function left empty ..
	// request wiill not be called 

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});


	next();

});


/*
app.use((req,res,next) => {
	res.render('maintenance.hbs');
});
*/


app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/', (request, response) => {
	//	response.send('<h1>Hello Express!</h1>');

	/*response.send({
		name : 'Rajesh Raman',
		likes : ['Biking','Coding']
	});*/

	response.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to my website'

	});

});

app.get('/about', (request, response) => {

	response.render('about.hbs', {
		pageTitle: 'About page'
	});
});


app.get('/projects',(req,res) => {
	res.render('projects.hbs',{
		pageTitle: 'Projects'
	});
});

//bad - send back jason with errorMessage

app.get('/bad', (request, response) => {
	response.send({
		erroMessage: 'Unable to handle request'
	});
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
