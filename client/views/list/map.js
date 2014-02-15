Template.map.rendered = function(){
    var markersArray = [],
        lines = [];

    var style = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]

    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(47.497912, 10),
        styles: style
    };


    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        document.getElementById('info'));


    Deps.autorun(function(){
        clearOverlays();

        var geodesicPoly;
        var stories = Template.list.stories();

        stories.forEach(function (story) {


            var m1 = new google.maps.Marker({
                position: new google.maps.LatLng(story.fromLocLat, story.fromLocLng),
                map: map
            });


            var m2 = new google.maps.Marker({
                position: new google.maps.LatLng(story.toLocLat, story.toLocLng),
                map: map
            });

            markersArray.push(m1);
            markersArray.push(m2);

            var geodesicOptions = {
                strokeColor: '#32ac97',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                geodesic: true,
                clickable: true,
                map: map
            };
            geodesicPoly = new google.maps.Polyline(geodesicOptions);

            var path = [m1.getPosition(), m2.getPosition()];
            geodesicPoly.setPath(path);

            lines.push(geodesicPoly);
        });

    })

    function clearOverlays() {
        for (var i = 0; i < markersArray.length; i++ ) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;

        for (var i = 0; i < lines.length; i++ ) {
            lines[i].setMap(null);
        }
        lines.length = 0;
    }




}



