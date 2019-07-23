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
    styles: [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ecdcc3"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#776340"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#776340"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e5d8c3"
            },
            {
                "lightness": "-6"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "weight": "1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#8f8470"
            },
            {
                "lightness": "0"
            },
            {
                "weight": "1"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "invert_lightness": true
            },
            {
                "lightness": "37"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b0b0b0"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "28"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

  });

  getData();
  drawIMMarker();
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
      url: 'assets/images/user-position.png',
      size: new google.maps.Size(384, 720),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(20, 27)
    };
    var myLatlng = new google.maps.LatLng(lat, long);
    $(document).attr('lat',lat);
    $(document).attr('lon',long);
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


  var clueRange = $(document).attr("Range");
  if (clueRange == undefined) { clueRange = 10; };
  $(document).attr("Range",clueRange);
  //var clueRange=20;
  /*
  $("#range-modal").modal('toggle');
  $("#rangeInfo").text("distance=" + d + " Clue range=" + clueRange);
*/
  if (d <= clueRange) {
      
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

function drawIMMarker() {
    //put on IM marker
  var imPosition = new google.maps.LatLng(51.405800, -1.323665); 
  var marker=new google.maps.Marker({
      position: imPosition,
    icon: {
      url: 'assets/images/im-pin.png',
      scaledSize:new google.maps.Size(100,60)
    }
  });
  marker.setMap(map);
}

function drawMarker(markerInfo) {

  //put on clue markers
  
  
  var markerPosition = new google.maps.LatLng(markerInfo[1], markerInfo[2]);
  //add data to marker
  var marker = new google.maps.Marker({
    position: markerPosition,
    title: 'Clue',
    icon: {
      url: 'assets/images/clue-position-flag-inactive-large.png',
      scaledSize: new google.maps.Size(50, 50)
    },
    question: markerInfo[0],
    active: false
  });

  var lat2, lon2;
/*
  marker.addListener('click', function() {
    //check if previous infowindow is open and, if so, close it
    navigator.geolocation.getCurrentPosition(function(pos) {
      var crd = pos.coords;
      lat2 = crd.latitude;
      lon2 = crd.longitude;
      if (getDistanceBetween(markerInfo[1], markerInfo[2], lat2, lon2) == true || marker.active==true) {
        infoContent = "<div><p>Clue</p><p>" + marker.question + "</p>"
        marker.setIcon({
          url: 'assets/images/clue-position-flag-active.png',
          scaledSize: new google.maps.Size(25, 45)
        })
        marker.active=true;

      }
      else {
        infoContent = "<div><p>Clue</p><p>You need to move closer.</p>"+marker.active;

      }
      showInfo(infoContent, marker);

    }, error, options);
  });*/
  
    marker.addListener('click', function() {
    //check if previous infowindow is open and, if so, close it
    lon2=$(document).attr('lon');
    lat2=$(document).attr('lat');
    $('#click-sound')[0].play();
        clueRange = $(document).attr("Range");
    marker.setIcon({ url: 'assets/images/clue-position-flag-inactive-large-select.gif', scaledSize: new google.maps.Size(50, 50) })
      if (getDistanceBetween(markerInfo[1], markerInfo[2], lat2, lon2) == true || marker.active==true) {
        infoContent = "<div><p>Clue</p><p>" + marker.question + "</p></div>"+clueRange
        setTimeout(function () {marker.setIcon({
          url: 'assets/images/clue-position-flag-active-large.png',
          scaledSize: new google.maps.Size(50, 50)
        })},800)
        marker.active=true;
        findAvenger();
      }
      else {
        setTimeout(function () {marker.setIcon({
          url: 'assets/images/clue-position-flag-inactive-large.png',
          scaledSize: new google.maps.Size(50, 50)
        })},900)          
        infoContent = "<div><p>You need to move closer.</p></div>"+clueRange;
      }
      showInfo(infoContent, marker);

  });

  marker.setMap(map);
}

function findAvenger() {
  var local_avengers=localStorage.getItem("avenger_list");
  var avengers;

  if(local_avengers==undefined) {
    avengers=[1,2,3,4,5,6,7,8];
  }  
  else{
    avengers=JSON.parse(local_avengers);
  }
    var avengerLength=avengers.length;
    if(avengerLength!=0) {
    var avengerLocation=Math.floor((Math.random()*avengerLength));
    var avenger=avengers[avengerLocation];
    var avengerIndex=avengers.indexOf(avenger);
    avengers.splice(avengerIndex,1);
    localStorage.setItem("avenger_list",JSON.stringify(avengers));
    $('.full-avenger img').attr('src','assets/images/avenger-full-'+avenger+'.png');
    $('.full-avenger-text').fadeIn(250);
    setTimeout(function() { $('.full-avenger').show();  $('.full-avenger img').addClass("full-avenger-animate"); $('#avenger-'+avenger).fadeIn(1500); },500);
    setTimeout( function() { $('.full-avenger').removeClass("full-avenger-animate");$('.full-avenger').hide(); $('.full-avenger-text').hide();},3000);  
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function showInfo(infoContent, marker) {
  var infowindow = new google.maps.InfoWindow({
    content: infoContent,

  });

  if (previousInfoWindow) {
    previousInfoWindow.close();
  }
  previousInfoWindow = infowindow;
  infowindow.open(map, marker);
  if(marker.active==false) {
      setTimeout(function() { infowindow.close() },2500);
  }
}

/*
function increaseRange() {
  var currentRange = $(document).attr('Range');
  if (currentRange == undefined) { currentRange = 50; };
  console.log(currentRange)
  currentRange += 1000;
  $(document).attr('Range', currentRange);
  $("#range-modal").modal('toggle');
  $("#rangeInfo").text(currentRange);
}

function decreaseRange() {
  var currentRange = $(document).attr('Range');
  if (currentRange == undefined) { currentRange = 50; };
  console.log(currentRange)
  currentRange -= 1000;
  $(document).attr('Range', currentRange);
  $("#range-modal").modal('toggle');
  $("#rangeInfo").text(currentRange);
}

*/
