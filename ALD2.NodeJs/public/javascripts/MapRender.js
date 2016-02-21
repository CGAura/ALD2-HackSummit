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
    
    createVaccineControls();
    
    createColorKey();
    
    return true;
}


function createVaccineControls() {
    
    var index = 1
    addNewVaccineControl(index, 'white', 'Men C', 'mencColor');
    
    index += 1;
    addNewVaccineControl(index, 'white', 'DTAP', 'dtapColor');
    
    index += 1;
    addNewVaccineControl(index, 'white', 'Hep B', 'hepbColor');
        
    index += 1;
    addNewVaccineControl(index, 'white', 'PVC', 'pvcColor');

    index += 1;
    addNewVaccineControl(index, 'white', 'Average', 'color');

}

function addNewVaccineControl(index, color, id, vaccType) {
    
    var controllerDiv = document.createElement('div');
    var Controller = new selectControl(controllerDiv, color, id, vaccType);
    controllerDiv.index = index;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controllerDiv);
}


function createColorKey() {
    
    var index = 1;
    addNewColorKeyControl(index, '#00ff00', '> 90%');

    index += 1;
    addNewColorKeyControl(index, '#f2ff00', '60% - 90%');
    
    index += 1;
    addNewColorKeyControl(index, '#ffbb00', '30% - 60%');
    
    index += 1;
    addNewColorKeyControl(index, '#ff0000', '< 30%');
    
}

function addNewColorKeyControl(index, color, id) {
    
    var controllerDiv = document.createElement('div');
    var Controller = new colorControl(controllerDiv, color, id);
    controllerDiv.index = index;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controllerDiv);
}


function colorControl(controlDiv, color, text) {
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

function selectControl(controlDiv, color, text, vaccType) {
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
        
    controlUI.addEventListener('mouseover', function () {
        controlUI.style.backgroundColor = 'lightgrey';
    });

    controlUI.addEventListener('mouseout', function () {
        controlUI.style.backgroundColor = color;
    });

    controlUI.addEventListener('mousedown', function () {
        controlUI.style.backgroundColor = 'lightblue';
    });
    
    controlUI.addEventListener('mouseup', function () {
        controlUI.style.backgroundColor = color;
    });
}



