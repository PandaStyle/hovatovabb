
Stories = new Meteor.Collection('stories');


//WebFont.load({
//    google: {
//        families: ["Montserrat:400,700","PT Sans:400,700","Varela Round:400","Varela:400"]
//    }
//});

Template.list.stories = function(){
        return Stories.find();
}

Template.list.rendered = function(){
  
var stories = Stories.find();
  
  
  

  
var poly;
var geodesicPoly;
var marker1;
var marker2;

function initialize() {
  var style = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
  
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(34, -40.605),
    styles: style
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('info'));

stories.forEach(function (story) {
console.log(story);
  var m1 = new google.maps.Marker({
        position: new google.maps.LatLng(story.fromLocLat, story.fromLocLng),
        map: map
     });

  
  var m2 = new google.maps.Marker({
        position: new google.maps.LatLng(story.toLocLat, story.toLocLng),
        map: map
     });
  
  var geodesicOptions = {
    strokeColor: '#32ac97',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    map: map
  };
  geodesicPoly = new google.maps.Polyline(geodesicOptions);
  
  var path = [m1.getPosition(), m2.getPosition()];
   geodesicPoly.setPath(path);

});
  
  
 
}

function update() {
  var path = [marker1.getPosition(), marker2.getPosition()];

  geodesicPoly.setPath(path);

  document.getElementById('heading').value = heading;
  document.getElementById('origin').value = path[0].toString();
  document.getElementById('destination').value = path[1].toString();
}

initialize();
  
}