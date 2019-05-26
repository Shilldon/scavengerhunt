

$(document).ready(function() { 

            

$("#centre-map-button").on("click", function() {
  centre();
  setTimeout(function() { $('#dragon').focus()},1000);
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