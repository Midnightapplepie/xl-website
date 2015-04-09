'use strict';

var website = angular.module('websiteControllers',[]);

website.controller("indexCtrl",["$scope","$location","$window",
  function($scope, $location, $window){
  
  $scope.links=[];

  $scope.templates = [
                    {name:"carousel",navLink:false,text:""},
                    {name:"about",navLink:true,text:"About"},
                    {name:"menus",navLink:true,text:"Menus"},
                    {name:"storeInfo",navLink:true,text:"Store Hour"}
                    // {name:"contact",navLink:true,text:"Contact"}
                  ];

  //this create $scope.templates object with uri so view can include them at ng-repeat 
  for(var i = 0; i < $scope.templates.length; i++){
    $scope.templates[i].location = "app/partials/" + $scope.templates[i].name + ".html";
    if ($scope.templates[i].navLink){
      $scope.links.push($scope.templates[i]);
    }
  }

  $scope.goTo = function(template) {
    var id = template.name;
    var endLocation = $window.document.getElementById(id).offsetTop;
    $window.scrollTo(0,endLocation);
  };

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

	$http.get('http://localhost:5000/menu').
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
