var webServices = angular.module('webServices',[]);

webServices.factory('mapService',function($q){

	return {
		xiaoLoongLatLng: new google.maps.LatLng(37.738520,-122.468800),
		xiaoLoongAddress: "250 West Portal Avenue, San Francisco, CA 94127",

		mapInit:function(){

					var mapOptions = {
					  center: this.xiaoLoongLatLng,
					  zoom: 19,
					  scrollwheel: false,
					  draggable: false
					};

					var map = new google.maps.Map(document.getElementById('map-canvas'),
					    mapOptions);

					var marker = new google.maps.Marker({
						position: this.xiaoLoongLatLng,
						title: "Visit us!"
					});

					marker.setMap(map);

					return map
		},

		calculateRoute: function(start,mapObject){
			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			var deferred = $q.defer();

			directionsDisplay.setMap(mapObject);

			var request = {
				origin:start,
				destination:this.xiaoLoongAddress,
				travelMode: google.maps.TravelMode.DRIVING
			};

			directionsService.route(request,function(result,status){
				if(status == google.maps.DirectionsStatus.OK){
					directionsDisplay.setDirections(result);
					console.log(result)
					deferred.resolve(result.routes[0].legs[0]);
				}
			})

			return deferred.promise
		},	

		getDirection: function(mapObject){
			navigator.geolocation.getCurrentPosition(success,error);
			var mapService = this;
			var deferred = $q.defer();

			function success(pos){
				var lat = pos.coords.latitude;
				var lng = pos.coords.longitude;
				var start = new google.maps.LatLng(lat,lng); 

				deferred.resolve(mapService.calculateRoute(start,mapObject));
			}	

			function error(pos){
				alert("Sorry, unable to get your current location, please enable location service on your device");
			}
			
			return deferred.promise
		},

		parseDirection:function(jsonString){
			var data = jsonString
			var steps = data["steps"];
			var array = [];

			for (i in steps){
				array.push({
					distance: steps[i]["distance"]["text"],
					time:steps[i]["duration"]["text"],
					instruction:steps[i]["instructions"]
				})
			}

			return{
				start: data["start_address"],
				end: "250 West Portal Ave, San Francisco, CA 94127",
				distance: data["distance"]["text"],
				duration: data["duration"]["text"],
				directions: array 
			}
		}
	}
})