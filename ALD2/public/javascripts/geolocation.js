var coordinates;

function getGeoLocation(success){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            coordinates = {};
            coordinates.lat = position.coords.latitude;
            coordinates.long = position.coords.longitude;
            success();
        });
    }
    else {
        alert('geo location not supported');
    }
}

