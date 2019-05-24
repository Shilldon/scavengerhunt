      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


function drawMarker(markerInfo) {
  var markerPosition = new google.maps.LatLng(markerInfo[0], markerInfo[1]);
  //add data to marker
  var marker = new google.maps.Marker({
    position: markerPosition,
    title: markerInfo[2],
    icon: {
      url: 'assets/images/pin.png',
      scaledSize: new google.maps.Size(30, 30)
    },
    type: markerInfo[3],
    educationPhase: markerInfo[4],
    schoolWebsite: markerInfo[5],
    schoolTelephone: markerInfo[6],
    SEN: markerInfo[7],
    schoolHead: markerInfo[8],
    offstedRating: markerInfo[9]
  });    
}