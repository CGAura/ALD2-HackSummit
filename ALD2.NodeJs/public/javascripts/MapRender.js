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
    
    var greenColorKeyDiv = document.createElement('div');
    var greenColorKeyController = new colorControl(greenColorKeyDiv, map, '#00ff00', 'Over 90% vaccinated');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(greenColorKeyDiv);
    
    var yellowColorKeyDiv = document.createElement('div');
    var yellowColorKeyController = new colorControl(yellowColorKeyDiv, map, '#f2ff00', 'between 60% - 90% vaccinated');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(yellowColorKeyDiv);
    
    var orangeColorKeyDiv = document.createElement('div');
    var orangeColorKeyController = new colorControl(orangeColorKeyDiv, map, '#ffbb00', 'between 30% - 60% vaccinated');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(orangeColorKeyDiv);
    
    var redColorKeyDiv = document.createElement('div');
    var redColorKeyController = new colorControl(redColorKeyDiv, map, '#ff0000', 'Less than 30% vaccinated');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(redColorKeyDiv);
    
    return true;
}

function colorControl(controlDiv, map, color, text) {
    controlDiv.style.padding = '5px';
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = color;
    controlUI.style.border = '1px solid';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = text
    controlUI.appendChild(controlText);
}

function changeColor(colorProp) {
    
    map.data.setStyle(function (feature) {
        var color = feature.getProperty(colorProp)
        return {
            fillColor : color,
            strokeWeight: 0.75
        };
    });

    return true;
}


