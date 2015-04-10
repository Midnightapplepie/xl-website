'use strict';

var website = angular.module('websiteControllers',[]);

website.controller("indexCtrl",["$scope","$location","$window",
  function($scope, $location, $window){
  
  $scope.links=[];

  $scope.templates = [
                    {name:"carousel",navLink:false,text:""},
                    {name:"about",navLink:true,text:"About"},
                    {name:"menus",navLink:true,text:"Menus"},
                    {name:"storeInfo",navLink:true,text:"Store Hour"},
                    {name:"contact",navLink:true,text:"Contact"}
                    // {name:"contact",navLink:true,text:"Contact"} 
                  ];

  //this create $scope.templates object with uri so view can include them at ng-repeat 
  for(var i = 0; i < $scope.templates.length; i++){
    $scope.templates[i].location = "partials/" + $scope.templates[i].name + ".html";
    if ($scope.templates[i].navLink){
      $scope.links.push($scope.templates[i]);
    }
  }

  $scope.goTo = function(template) {
    $scope.toggleNav();
    var id = template.name;
    if(template.name === "about"){
      $window.scrollTo(0,0);
    }else{
      $window.scrollTo(0,$window.document.getElementById(id).offsetTop);
    }
  };

  $scope.openNav = false;

  $scope.toggleNav = function(){
    $scope.openNav = !$scope.openNav;
  }

}]);

//--------------------------Carousel-------------------------------------------
website.controller("carouselCtrl",function($scope){
    
    $scope.myInterval = 3000;

	$scope.slides = [{url:"http://placekitten.com/g/800/500"},
				  	 {url:"http://placekitten.com/g/800/500"},
				  	 {url:"http://placekitten.com/g/800/500"}]
})


//--------------------------Menu-------------------------------------------
website.controller("menuCtrl",function($scope,$http){
	var menu = $scope.menu; 
	$scope.activeCategory;
	$scope.categories;

	$http.get('/menu').
		success(function(data,status,headers,config){
			$scope.categories = data.categories;
			menu = data.menu;
		}).
		error(function(data,status,headers,config){
			alert("server error");
		});

	$scope.selectCategory=function(object){
		$scope.activeCategory = menu[object.key] 
	}	


})
//--------------------------storeInfo-------------------------------------------
website.controller("storeInfoCtrl",["$scope","mapService",function($scope,mapService){
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

  var map = mapService.mapInit();

  $scope.getDirection = function(){
    mapService.getDirection(map);
  }
}])
//--------------------------storeInfo-------------------------------------------
website.controller("contactCtrl",function($scope,$http,$window){

  $scope.openYelp = function(){
    $window.open("http://www.yelp.com/biz/xiao-loong-restaurant-san-francisco")
  }

  $scope.sendMessage = function(user){
    $http.post('/contact', {data:user}).
      success(function(data,status,headers,config){
        alert(data)
      }).
      error(function(data,status,headers,config){
        alert(data)
      })
  }
})