Template.search.rendered = function () {

        var optionsFrom = {
            types: ['(cities)'],
            componentRestrictions: {country: "hu"}
        };

        var optionsTo = {
            types: ['(cities)']
        };


        var inputSearchFrom = /** @type {HTMLInputElement} */(
            document.querySelector('.searchFrom'));
        var inputSearchTo = /** @type {HTMLInputElement} */(
            document.querySelector('.searchTo'));

        autocompleteSearchFrom  = new google.maps.places.Autocomplete(inputSearchFrom, optionsFrom);
        autocompleteSearchTo  = new google.maps.places.Autocomplete(inputSearchTo, optionsTo);


        google.maps.event.addListener(autocompleteSearchFrom, 'place_changed', function() {
            if(!(autocompleteSearchFrom.getPlace().id)){
                if(autocompleteSearchFrom.getPlace().name.length > 0 && !autocompleteSearchFrom.getPlace().geometry){
                   $(inputSearchFrom).addClass('error');
                   return;
                }

                $(inputSearchFrom).removeClass('error');

                Session.set('fromCityId', null);
                return;
            }
            $(inputSearchFrom).removeClass('error');
            Session.set('fromCityId', autocompleteSearchFrom.getPlace().id);
        });

        google.maps.event.addListener(autocompleteSearchTo, 'place_changed', function() {
            if(!(autocompleteSearchTo.getPlace().id)){
                if(autocompleteSearchTo.getPlace().name.length > 0 && !autocompleteSearchTo.getPlace().geometry){
                    $(inputSearchTo).addClass('error');
                    return;
                }
                $(inputSearchTo).removeClass('error');

                Session.set('toCityId', null);
                return;
            }
            $(inputSearchTo).removeClass('error');

            Session.set('toCityId', autocompleteSearchTo.getPlace().id);
        });
}
