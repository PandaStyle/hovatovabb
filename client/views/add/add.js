
function init() {

    var mapOptionsFrom = {
        center: new google.maps.LatLng(47.28921, 19.13878),
        zoom: 7,
        disableDefaultUI: true,
        types: ['(cities)'],
        componentRestrictions: {country: "hu"}
    };

    var mapOptionsTo = {
        center: new google.maps.LatLng(47.28921, 19.13878),
        zoom: 1,
        disableDefaultUI: true,
        types: ['(cities)']
    };                     

    var mapFrom = new google.maps.Map(document.querySelector('.mapfrom'),
        mapOptionsFrom);
    var mapTo= new google.maps.Map(document.querySelector('.mapto'),
        mapOptionsTo);

    var inputFrom = /** @type {HTMLInputElement} */(
        document.querySelector('.inputfrom'));
    var inputTo = /** @type {HTMLInputElement} */(
        document.querySelector('.inputto'));

    var types = document.getElementById('type-selector');
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    autocompleteFrom  = new google.maps.places.Autocomplete(inputFrom);

    autocompleteFrom.bindTo('bounds', mapFrom );
    var infowindowFrom  = new google.maps.InfoWindow();
    var markerFrom  = new google.maps.Marker({
        map: mapFrom
    });


    autocompleteTo  = new google.maps.places.Autocomplete(inputTo );
    autocompleteTo.bindTo('bounds', mapTo);
    var infowindowTo  = new google.maps.InfoWindow();
    var markerTo  = new google.maps.Marker({
        map: mapTo
    });

    google.maps.event.addListener(autocompleteFrom , 'place_changed', function() {
        infowindowFrom.close();
        markerFrom.setVisible(false);
        var placeFrom  = autocompleteFrom.getPlace();
        if (!placeFrom.geometry) {
            return;
        }

        // If the place has a geometry, then present it on a map.
//        if (placeFrom.geometry.viewport) {
//            mapFrom.fitBounds(placeFrom.geometry.viewport);
//        } else {
//            mapFrom.setCenter(placeFrom.geometry.location);
//            mapFrom.setZoom(17);  // Why 17? Because it looks good.
//        }
        markerFrom.setIcon(/** @type {google.maps.Icon} */({
            url: placeFrom.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        markerFrom.setPosition(placeFrom.geometry.location);
        markerFrom.setVisible(true);

        var address = '';
        if (placeFrom.address_components) {
            address = [
                (placeFrom.address_components[0] && placeFrom.address_components[0].short_name || ''),
                (placeFrom.address_components[1] && placeFrom.address_components[1].short_name || ''),
                (placeFrom.address_components[2] && placeFrom.address_components[2].short_name || '')
            ].join(' ');
        }

    });


    google.maps.event.addListener(autocompleteTo , 'place_changed', function() {
        infowindowTo.close();
        markerTo.setVisible(false);
        var placeTo  = autocompleteTo.getPlace();
        if (!placeTo.geometry) {
            return;
        }

        // If the place has a geometry, then present it on a map.
        markerFrom.setIcon(/** @type {google.maps.Icon} */({
            url: placeTo.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        markerTo.setPosition(placeTo.geometry.location);
        markerTo.setVisible(true);

        var address = '';
        if (placeTo.address_components) {
            address = [
                (placeTo.address_components[0] && placeTo.address_components[0].short_name || ''),
                (placeTo.address_components[1] && placeTo.address_components[1].short_name || ''),
                (placeTo.address_components[2] && placeTo.address_components[2].short_name || '')
            ].join(' ');
        }


    });

  
}



Template.add.rendered = function(){
  
init();

}

Template.add.events = {
    'keydown': function(evt) {
        if (evt.which === 13) {
           evt.preventDefault();
        }
    },

    'click input[type=submit]': function(e, instance){
        e.preventDefault();

        var item = {
          name: $('#name').val(), 
            from: $('.inputfrom').val(),
            fromCityId: autocompleteFrom.getPlace().id,
            fromLocLat: autocompleteFrom.getPlace().geometry.location.lat(),
            fromLocLng: autocompleteFrom.getPlace().geometry.location.lng(),          
            to: $('.inputto').val(),
            toLocLat: autocompleteTo.getPlace().geometry.location.lat(),
            toLocLng: autocompleteTo.getPlace().geometry.location.lng(),
            toCityId: autocompleteTo.getPlace().id,
            age: $('#age').val(),
            dateOut: $('#date-out').val(),
            dateBack: $('#date-back').val(),
            story: $('#story').val()
        };



        Meteor.call('submit', item, function(error, story) {

            if(error){
                console.log(error.reason);

            }else{
                console.log("new story", {'storyId': story.storyId});

                Router.go('/listpage');
            }
        });

    }
}



