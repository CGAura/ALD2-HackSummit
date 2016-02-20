var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('MyGoogleMapID'), {
        zoom: 11,
        center: { lat: 51.50, lng: -0.127 }
    });
    map.data.loadGeoJson('/KlmData/');
    
    map.data.setStyle(function (feature) {
        var color = feature.getProperty('color');
        return {
            fillColor: color,
            strokeWeight: 0.5
        };
    });
    
    map.data.addListener('click', function (event) {
        document.getElementById('MyInfo').textContent =
                  event.feature.getProperty('ccgCode');
    });
    
    return true;
}