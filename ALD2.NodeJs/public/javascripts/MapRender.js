var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('MyGoogleMapID'), {
        zoom: 7,
        center: { lat: 52.95, lng: -1.13333 }
    });
    map.data.loadGeoJson('/KlmData/');
    
    map.data.setStyle(function (feature) {
        var color = feature.getProperty('color');
        return {
            fillColor: color,
            strokeWeight: 0.75
        };
    });
    
    map.data.addListener('click', function (event) {
        document.getElementById('MyInfo').textContent =
                  event.feature.getProperty('ccgCode');
    });
    
    return true;
}