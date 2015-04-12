'use strict';

var website = angular.module('websiteControllers',[]);

website.controller("indexCtrl",["$scope","$location","$window",
  function($scope, $location, $window){
  
  $scope.templates = [
                    {name:"about",text:"About"},
                    {name:"menus",text:"Menus"},
                    {name:"storeInfo",text:"Store Hour"},
                    {name:"contact",text:"Contact"}
                  ];

  //this create $scope.templates object with uri so view can include them at ng-repeat 
  for(var i = 0; i < $scope.templates.length; i++){
    $scope.templates[i].location = "partials/" + $scope.templates[i].name + ".html";
  }

  $scope.goTo = function(template) {
    $scope.toggleNav();
    var vh = $window.innerHeight;
    var id = template.name;
    if(template.name === "about"){
      $window.scrollTo(0,0);
    }else{
      $window.scrollTo(0,$window.document.getElementById(id).offsetTop - 0.08*vh);
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
website.controller("menuCtrl",function($scope,$modal){
  $scope.open = function(size){
    var menusItemsModal = $modal.open({
      templateUrl: 'partials/menusItems.html',
      controller: "modalInstanceCtrl",
      size:'lg'
    })
  }
})

website.controller('modalInstanceCtrl',function($scope,$modalInstance,$http){
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

  $scope.close = function(){
    $modalInstance.close()
  }
})
//--------------------------storeInfo-------------------------------------------
website.controller("storeInfoCtrl",function($scope,$modal,mapService,$timeout){

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
    mapService.getDirection(map).then(function(result){
        var modalInstance = $modal.open({
          templateUrl:"partials/direction.html",
          controller:'directionCtrl',
          resolve:{
            direction:function(){
              return result
            }
          }
        })
      });
  }
})


website.controller('directionCtrl',function($scope,$modalInstance,direction, mapService){
  $scope.direction = mapService.parseDirection(direction);
  console.log($scope.direction);
  $scope.steps = [];
  
  function getsubStr(string){
    var result = {};
    result["text"] = string.substr(0,string.indexOf("<div"))
    result["div"] = string.substr(string.indexOf("<div"),string.length - 1)
    return result
  }

  function constructSentence(inst,dist,time){
    var sentance =  inst + ", drive about " + step.distance + " (" + step.time + ")"
    return sentance
  }

  var directions = $scope.direction.directions;

  for(var i = 0; i < directions.length; i ++){
    var step = directions[i];
    var inst = step.instruction;
    var lastStep;

    if(i === directions.length - 1) {
      var result  = getsubStr(step.instruction)
      inst = result.text;
      lastStep = result.div
      $scope.steps.push(constructSentence(inst,step.distance,step.time));
      $scope.steps.push(lastStep)
    }else{
      $scope.steps.push(constructSentence(inst,step.distance,step.time));
    }
  }

  $scope.close = function(){
    $modalInstance.close()
  }
})
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