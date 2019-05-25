
//import the marker data from the local csv
function getMarkerInfo() {
  var data;
  $.ajax({
    type: "GET",
    url: "assets/data/marker-data.csv",
    dataType: "text",
    success: function(response) {
      data = $.csv.toArrays(response);
      generateMarkers(data);
    }
  });
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow, marker, myLatlng;

function initMap() {



  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 15,

    disableDefaultUI: true,
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#523735"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "administrative",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#c9b2a6"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#dcd2be"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ae9e90"
        }]
      },
      {
        "featureType": "landscape",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#93817c"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#a5b076"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#447530"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fdfcf8"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f8c967"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#e9bc62"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e98d58"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#db8555"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#806b63"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8f7d77"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#b9d3c2"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#92998d"
        }]
      }
    ]

  });

  getData();

  centre();
  follow();

}

var geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

function geoError() {
  console.log("Sorry, no position available.");
}

function centre() {
  navigator.geolocation.getCurrentPosition(function(position) {
    myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  }, geoError, geoOptions);
}

function follow() {
  var win = function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var iconimage = {
      url: 'assets/images/user-position-pin.png',
      size: new google.maps.Size(384, 720),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(16, 30)
    };
    var myLatlng = new google.maps.LatLng(lat, long);
    if (marker) {
      marker.setMap(null);

    }
    marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: iconimage
    });


    marker.setMap(map);
  };

  var watchID = navigator.geolocation.watchPosition(win);
}

function getData() {
  var data;
  $.ajax({
    type: "GET",
    url: "assets/data/markers.csv",
    dataType: "text",
    success: function(response) {
      var rows = response.split(/\n/);
      for (i = 1; i < rows.length; i++) {
        markerInfo = [];

        // For every row - split it into columns
        var columns = rows[i].split(/,/);
        for (var colIndex in columns) {
          var colValue = columns[colIndex].trim();
          // here you have the colValue to play with
          markerInfo.push(colValue);
        }
        drawMarker(markerInfo);
      }
    }
  });
}

function toRad(Value) {
  return Value * Math.PI / 180;
}

function getDistanceBetween(lat1, lon1, lat2, lon2) {

  var R = 6371000; // metres
  var φ1 = toRad(lat1);
  var φ2 = toRad(lat2);
  var Δφ = toRad(lat2 - lat1);
  var Δλ = toRad(lon2 - lon1);
 //alert("φ1 " + φ1 + "φ2 " + φ2)
  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;


    var clueRange=$(document).attr("Range");
    if(clueRange==undefined) { clueRange=20; };
  $("#range-modal").modal('toggle');
  $("#rangeInfo").text("distance="+d+" Clue range="+clueRange);

  if(d<=clueRange) {
    return true;
  }
  else {
    return false;
  }
}

var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};


var previousInfoWindow = false;

function drawMarker(markerInfo) {

  var markerPosition = new google.maps.LatLng(markerInfo[1], markerInfo[2]);
  //add data to marker
  var marker = new google.maps.Marker({
    position: markerPosition,
    title: 'Clue',
    icon: {
      url: 'assets/images/clue-position-pin-inactive.png',
      scaledSize: new google.maps.Size(16, 30)
    },
    question: markerInfo[0],
  });

    var lat2, lon2;
    
  marker.addListener('click', function() {
    //check if previous infowindow is open and, if so, close it
    navigator.geolocation.getCurrentPosition(function(pos) {
      var crd = pos.coords;
      lat2 = crd.latitude;
      lon2 = crd.longitude;
      if(getDistanceBetween(markerInfo[1], markerInfo[2], lat2, lon2)==true) {
        infoContent = "<div><p>Clue</p><p>" + marker.question + "</p>"
        marker.setIcon({url: 'assets/images/clue-position-pin-active.png',
      scaledSize: new google.maps.Size(16, 30)})
        
      }
      else {
        infoContent = "<div><p>Clue</p><p>You need to move closer.</p>"
        
      }
      showInfo(infoContent,marker);
      
    },error,options);
  });

  marker.setMap(map);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function showInfo(infoContent,marker) {
  var infowindow = new google.maps.InfoWindow({
    content: infoContent,

  });
  
      if (previousInfoWindow) {
      previousInfoWindow.close();
    }
    previousInfoWindow = infowindow;
    infowindow.open(map, marker);
}

function increaseRange() {
  var currentRange=$(document).attr('Range');
  if(currentRange==undefined) {currentRange=50; };
  console.log(currentRange)
  currentRange+=10;
  $(document).attr('Range',currentRange);
  $("#range-modal").modal('toggle');
  $("#rangeInfo").text(currentRange);
}

function decreaseRange() {
  var currentRange=$(document).attr('Range');
  if(currentRange==undefined) {currentRange=50; };  
  console.log(currentRange)
  currentRange-=10;
  $(document).attr('Range',currentRange);
  $("#range-modal").modal('toggle');
  $("#rangeInfo").text(currentRange);
}
