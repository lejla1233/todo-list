var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


//init app
var app = express();

//setup template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//mongo connection
const MongoClient = require('mongodb').MongoClient;
const MongoURL = 'mongodb://localhost:27017/todo';


MongoClient.connect(MongoURL, function(err, database) {
	console.log('MongoDB connected!')
	if (err) {
		console.log(err);
	}
	
	todos = database.collection('todos');
});

//routes
app.get('/', function(req, res) {
		todos.find({}).toArray(function(err, docs) {
		if (err) {
			console.log(err);
		}
		res.render('index', {docs: docs});
		
	});

	app.get('/todos/:id', function(req, res) {
		res.render('show');
	});
	
	app.post('/todos/add', function(req, res) {
		todos.insert({title: req.body.title, description: req.body.description}, function(err, result){
		if (err) { 
			console.log(err);
		}
		res.redirect('/');
		});
	});
	
	app.get('/todos/add/edit/:id', function(req, res) {
		res.redirect('/');
		});

	app.post('/todos/update/:id', function(req, res) {
		res.redirect('/');
		});
	
	app.get('/todos/delete/:id', function(req, res) {
		res.redirect('/');
		});

app.listen(5000, function(){
	console.log('App listening at http://localhost:5000')
	
});
