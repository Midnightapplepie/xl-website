'use strict';

var website = angular.module('websiteControllers',[]);

website.controller("indexCtrl", function($scope){
 //    function select(ele){
	// var ele = document.querySelectorAll(ele);
	// 	if(ele.length > 1){
	// 		return ele
	// 	}else{
	// 		return ele[0]
	// 	}
	// }

	// angular.element(document).ready(function(){
	// 	console.log(select('div'))
	// })
	$scope.templates = {
		"carousel": "app/partials/carousel.html",
		"menu": "app/partials/menu.html",
		"about": "app/partials/about.html",
		"storeInfo": "app/partials/storeInfo.html",

	}	
});

//--------------------------Carousel-------------------------------------------
website.controller("carouselCtrl",function($scope){
    
    $scope.myInterval = 3000;

	$scope.slides = [{url:"http://placekitten.com/g/800/500"},
				  	 {url:"http://placekitten.com/g/800/500"},
				  	 {url:"http://placekitten.com/g/800/500"}]
})


//--------------------------Menu-------------------------------------------
website.controller("menuCtrl",['$scope','$http',function($scope,$http){
	var menu = $scope.menu; 
	$scope.activeCategory;
	$scope.categories;

	$http.get('http://localhost:5000/menu').
		success(function(data,status,headers,config){
			console.log(data.menu);
			$scope.categories = data.categories;
			menu = data.menu;
		}).
		error(function(data,status,headers,config){
			alert("server error");
		});

	$scope.selectCategory=function(object){
		$scope.activeCategory = menu[object.key] 
	}	


}])
//--------------------------storeInfo-------------------------------------------
website.controller("storeInfoCtrl",function($scope){
	var lunchHour="11:30 to 2:30";
	var dinnerHour="5:00 to 9:00";
	var dinnerHourPlus="5:00 to 9:30"

	$scope.storeHour = [
						{day:"",lunchTime:"Lunch",dinnerTime:"Dinner"},
						{day:"Monday",lunchTime:"closed",dinnerTime:dinnerHour},
						{day:"Thuesday - Thursday",lunchTime:lunchHour,dinnerTime:dinnerHour},
						{day:"Friday - Saturday",lunchTime:lunchHour,dinnerTime:dinnerHourPlus},
						{day:"Sunday",lunchTime:"closed",dinnerTime:dinnerHourPlus},
						]
})