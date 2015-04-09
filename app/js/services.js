var webServices = angular.module('webServices',[]);

webServices.factory('mapService',function(){

	return {
		xiaoLoongLatLng: new google.maps.LatLng(37.738520,-122.468800),
		xiaoLoongAddress: "250 West Portal Avenue, San Francisco, CA 94127",

		mapInit:function(){

					var mapOptions = {
					  center: this.xiaoLoongLatLng,
					  zoom: 19,
					  scrollwheel: false,
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
			directionsDisplay.setMap(mapObject);

			var request = {
				origin:start,
				destination:this.xiaoLoongAddress,
				travelMode: google.maps.TravelMode.DRIVING
			};

			directionsService.route(request,function(result,status){
				if(status == google.maps.DirectionsStatus.OK){
					directionsDisplay.setDirections(result);
					steps=result.routes[0].legs[0];
				}
			})

		},	

		getDirection: function(mapObject){
			navigator.geolocation.getCurrentPosition(success,error);
			var mapService = this;
			function success(pos){
				var lat = pos.coords.latitude;
				var lng = pos.coords.longitude;
				var start = new google.maps.LatLng(lat,lng); 

				mapService.calculateRoute(start,mapObject);
			}	

			function error(pos){
				alert("Sorry, unable to get your current location, please enable location service on your device");
			}
			
		}
	}
})