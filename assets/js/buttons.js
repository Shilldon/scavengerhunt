

$(document).ready(function() { 

  var local_avengers=localStorage.getItem("avenger_list");
  var avengers;

  if(local_avengers==undefined) {
    avengers=[1,2,3,4,5,6,7,8];
  }  
  else{
    avengers=JSON.parse(local_avengers);
  }
  for(i=0;i<=avengers.length;i++) {
    avenger=avengers[i];
    $('#avenger-'+avenger).hide();
  }

$("#centre-map-button").on("click", function() {
  //centre();
  //setTimeout(function() { $('#dragon').focus()},1000);
  
  //localStorage.removeItem('avenger_list');

  
});

$("#increase-range-button").on("click", function() {
  increaseRange();
});

$("#decrease-range-button").on("click", function() {
  decreaseRange();
});

$("#start-button").on("click",function(){
$(document).fullScreen(true); 
$("#start").css("display","none");
})



})