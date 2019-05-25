$(document).ready(function() { 
$("#centre-map-button").on("click", function() {
  centre();
});

$("#increase-range-button").on("click", function() {
  increaseRange();
});

$("#decrease-range-button").on("click", function() {
  decreaseRange();
});

})