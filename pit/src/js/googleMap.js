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
	   	controlDiv.style.padding = '10px';
		var zoomIn = document.createElement('div');
	   		zoomIn.classList.add("button");
	   		zoomIn.classList.add("buttonIn");
	   		controlDiv.appendChild(zoomIn);
	   	var zoomOut = document.createElement('div');
	   		zoomOut.classList.add("button");
	   		zoomOut.classList.add("buttonOut");
	   		controlDiv.appendChild(zoomOut);
		google.maps.event.addDomListener(zoomIn, 'click', function() {   
	   		map.setZoom(map.getZoom() + 1);
	    });
	    google.maps.event.addDomListener(zoomOut, 'click', function() {
	     	map.setZoom(map.getZoom() - 1);
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
     		fullscreenControl: true,
     		styles: [ {"stylers": [{"hue": "#baf4c4"},{"saturation": 10}]},{"featureType": "water","stylers": [{"color": "#effefd"}]}]
   		 });
 		var zoomDiv = document.createElement('div'),
    		zoomControl = new ZoomControl(zoomDiv, map);
    		map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomDiv);
	}
}

window.addEventListener('load', function () {
  var img = document.getElementsByClassName('gm-fullscreen-control');
	img[0].setAttribute("src", "../img/map/fullscreen_red.png");
	img[0].setAttribute("style", "heigth: 24px; width:24px;");
});



