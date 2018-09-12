function initMap() {
    // Create a map object and specify the DOM element
    // for display.
    var coord = {lat: 0, lng: 0};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: coord   // Initialized Lat/Long
        , zoom: 2.4     // Initialized Zoom
        , disableDefaultUI: true
    });
    $('#uCoordContainer').toggle();

    //Capture Users current location
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (pos) {  // Success CallBack
                coord = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
                setPin(map, coord );
                map.setCenter(coord);
                map.setZoom(13);
                
                $('#uCoordContainer').toggle();
                setCoordinateLabel(coord);
            },
            function (err) {  // Error Callback
                switch (err.code) {
                    case error.PERMISSION_DENIED:
                        break;
                    case error.POSITION_UNAVAILABLE:
                        break;
                    case error.TIMEOUT:
                        break;
                    default:    // Handles all other Errors not handled
                        break;
                }

                // Send Error information to API

                // Show response to User
                setPin(map, map.getCenter(),'ERROR: The GeoLocation service failed!' );
            }, { // Position Options

            }
        )
    } else {
        setPin(map, map.getCenter(),'ERROR: This browser does not support geolocation!' );
    }
}

/**
 * 
 * @param {Maps} map Google Maps Reference object
 * @param {Object} coord Coordinate object in the format {lat:###, lng:####}
 * @param {String} content String text representation of the Pin's content
 */
function setPin(map, coord, content = 'Default Location'){
    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(coord);
    infoWindow.setContent(content);
    infoWindow.open(map);
}

function setCoordinateLabel(coord){
    $('#uCoord').text(String.format('LAT: {0}; LNG: {1}', coord.lat, coord.lng));
}