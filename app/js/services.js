var websiteServices = angular.module('websiteServices',[]);

websiteServices.factory('loadMenu',function(){
	function loadMenu(){
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
		};

		var parser = parseCsv({columns: true}, function(err,data){
			var	items = data;
			for (var i=0; i<items.length; i++){
				menu[items[i].category_id].push(items[i])
			}
		});

		fs.createReadStream(__dirname+'../menu/menu.csv').pipe(parser)

		console.log(menu);
	};

	loadMenu();
})


