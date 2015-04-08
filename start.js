var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var parse = require('csv-parse');
var fs = require('fs');
var request = require('request');


var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//perpare menu
var menu={
	"appetizer":[],
	"soup":[],
	"seafood":[],
	"beef_lamb_pork":[],
	"chicken":[],
	"vegetables":[],
	"mein_fun":[],
	"fried_rice":[],
	"rice":[],
	"lunch_groups":["seafood","beef_lamb_pork","chicken","vegetables","mein_fun","fried_rice"]
}

var parser = parse({columns: true}, function(err,data){
	var	items = data;
	for (var i=0; i<items.length; i++){
		menu[items[i].category_id].push(items[i])
	}
});


fs.createReadStream('./app/menu/menu.csv').pipe(parser)



app.get('/menu',function(request, response){
	var categories=[];
	var keys = Object.keys(menu)
	for(var i = 0; i < keys.length - 1; i++){
		categories.push({key:keys[i],
						 name:menu[keys[i]][0].category_name})
	}

	response.json({menu: menu, categories: categories});
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// app.listen(5000)