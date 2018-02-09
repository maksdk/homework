function initMap(){
	var kyiv,
		map,
		marker,
		marker_url = '../img/map/icon-location.png';
	initialize();
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(positionReceived,positionNotReceived);
	}
	function ZoomControl(controlDiv, map) {
	   	controlDiv.style.padding = '5px';
		var zoomIn = document.createElement('div');
	   		zoomIn.classList.add("button");
	   		controlDiv.appendChild(zoomIn);
	   	var zoomOut = document.createElement('div');
	   		zoomOut.classList.add("button");
	   		controlDiv.appendChild(zoomOut);
		google.maps.event.addDomListener(zoomIn, 'click', function() {   
	   		map.setZoom(map.getZoom() + 1);
	    });
	    google.maps.event.addDomListener(zoomOut, 'click', function() {
	     	map.setZoom(map.getZoom() - 1);
	    });  
	}
	function FullScreen(fullScreenDiv, map, divMap){
	 	fullScreenDiv.style.padding = '5px';
	 	var fullScreen = document.createElement('div');
	   		fullScreen.classList.add("button");
	   		fullScreenDiv.appendChild(fullScreen);
		google.maps.event.addDomListener(fullScreen, 'click', function(e) {
	   		var height = document.documentElement.clientHeight;  
			if(divMap.style.height == false){
	   			divMap.style.height = height +"px";
	   		} else {
	   			divMap.style.height ="";
	   		}
	   	});
	}
	function toggleBounce() {
	  if (marker.getAnimation() !== null) {
	    marker.setAnimation(null);
	  } else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}
	function addMarker(coord){
		marker = new google.maps.Marker({ 
			position: coord ,
			map: map,
			icon: marker_url,
			animation: google.maps.Animation.DROP
		});	
		google.maps.event.addDomListener(marker, 'click', function() { 
	   		toggleBounce();
	    });
	}
	function positionReceived(position){
		map.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});
		addMarker({lat:position.coords.latitude, lng:position.coords.longitude});
	}
	function positionNotReceived(positionError){
		addMarker(kyiv);
	}
	
	function initialize() {
 		var divMap = document.getElementById('map');
 	
 		kyiv = {lat:50.450104, lng:30.524135};
 		map = new google.maps.Map(divMap, {
   	 		zoom: 18,
     		center: kyiv,
     		disableDefaultUI: true,
     		styles: [ {"stylers": [{"hue": "#baf4c4"},{"saturation": 10}]},{"featureType": "water","stylers": [{"color": "#effefd"}]}]
   		 });
	    //map.addListener('click', (e) => {
		// 	addMarker({lat: e.latLng.lat(), lng:e.latLng.lng()});
		// });
		var zoomDiv = document.createElement('div'),
    		zoomControl = new ZoomControl(zoomDiv, map);
    		map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomDiv);

   		var fullScreenDiv = document.createElement('div'),
    	    fullScreen = new FullScreen(fullScreenDiv, map, divMap);
    		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(fullScreenDiv);
	}
}