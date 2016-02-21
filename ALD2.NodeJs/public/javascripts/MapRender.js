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
    
    var mencControllerDiv = document.createElement('div');
    var mencController = new selectControl(mencControllerDiv, map, 'white', 'Men C', 'mencColor');
    mencControllerDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(mencControllerDiv);
    
    var dtapControllerDiv = document.createElement('div');
    var dtapController = new selectControl(dtapControllerDiv, map, 'white', 'DTAP', 'dtapColor');
    dtapControllerDiv.index = 2;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(dtapControllerDiv);
    
    var hepbControllerDiv = document.createElement('div');
    var hepbController = new selectControl(hepbControllerDiv, map, 'white', 'Hep B', 'hepbColor');
    hepbControllerDiv.index = 3;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(hepbControllerDiv);
    
    var pvcControllerDiv = document.createElement('div');
    var pvcController = new selectControl(pvcControllerDiv, map, 'white', 'PVC', 'pvcColor');
    pvcControllerDiv.index = 4;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(pvcControllerDiv);
    
    var averageControllerDiv = document.createElement('div');
    var averageController = new selectControl(averageControllerDiv, map, 'white', 'Average', 'color');
    averageControllerDiv.index = 5;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(averageControllerDiv);

    var greenColorKeyDiv = document.createElement('div');
    var greenColorKeyController = new colorControl(greenColorKeyDiv, map, '#00ff00', '> 90%');
    greenColorKeyDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(greenColorKeyDiv);
    
    var yellowColorKeyDiv = document.createElement('div');
    var yellowColorKeyController = new colorControl(yellowColorKeyDiv, map, '#f2ff00', '60% - 90%');
    yellowColorKeyDiv.index = 2;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(yellowColorKeyDiv);
    
    var orangeColorKeyDiv = document.createElement('div');
    var orangeColorKeyController = new colorControl(orangeColorKeyDiv, map, '#ffbb00', '30% - 60%');
    orangeColorKeyDiv.index = 3;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(orangeColorKeyDiv);
    
    var redColorKeyDiv = document.createElement('div');
    var redColorKeyController = new colorControl(redColorKeyDiv, map, '#ff0000', '< 30%');
    redColorKeyDiv.index = 4;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(redColorKeyDiv);
    

    
    return true;
}

function colorControl(controlDiv, map, color, text) {
    controlDiv.style.padding = '1px';
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
    controlText.innerHTML = text;
    controlUI.appendChild(controlText);
}

function selectControl(controlDiv, map, color, text, vaccType) {
    controlDiv.style.padding = '1px';
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
    controlText.innerHTML = text;
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function () {
        
        map.data.setStyle(function (feature) {
            var color = feature.getProperty(vaccType)
            return {
                fillColor : color,
                strokeWeight: 0.75
            };
        });
    });
}



