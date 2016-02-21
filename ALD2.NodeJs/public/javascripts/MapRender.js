var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('MyGoogleMapID'), {
        zoom: 7,
        center: { lat: 52.95, lng: -1.13333 },
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position:google.maps.ControlPosition.TOP_LEFT
        }
    });
    map.data.loadGeoJson('/KlmData/');
    
    map.data.setStyle(function (feature) {
        var color = feature.getProperty('averageColor');
        return {
            fillColor: color,
            strokeWeight: 0.75
        };
    });
    
    map.data.addListener('click', function (event) {
        document.getElementById('MyInfo').textContent =
                  event.feature.getProperty('ccgCode');
    });
    
    createVaccineControls(map);
    
    createColorKey();
    
    return true;
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
    controlUI.id = 'colorUI';
    controlUI.style.backgroundColor = color;
    controlDiv.appendChild(controlUI);
    var controlText = document.createElement('div');
    controlText.id = "colorText";    
    controlText.innerHTML = text;
    controlUI.appendChild(controlText);
}


function createVaccineControls(map) {
    
    
    var controllerDiv = document.createElement('div');
    var Controller = new SelectControl(controllerDiv, map);
    controllerDiv.index = 1;
    controllerDiv.style.paddingBottom = '15px';
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controllerDiv);
 
}

var mencControlUI;
var dtapControlUI;
var hepbControlUI;
var pvcControlUI;
var averageControlUI;

function SelectControl(controlDiv, map) {
    
    var control = this;
    control.active_ = 'average';
    
    mencControlUI = addSelectControlItem(control, controlDiv, 'menc', 'Men C', 'Click to show Meningiti C Vaccine Stats',  'white');
    dtapControlUI = addSelectControlItem(control, controlDiv, 'dtap', 'DTap', 'Click to show diphtheria, pertussis, and tetanus Vaccine Stats', 'white');
    hepbControlUI = addSelectControlItem(control, controlDiv, 'hepb', 'Hep B', 'Click to show Hepatitis Vaccine Stats', 'white');    
    pvcControlUI = addSelectControlItem(control, controlDiv, 'pvc', 'PVC', 'Click to show Pneumococcal conjugate Vaccine Stats', 'white');    
    averageControlUI = addSelectControlItem(control, controlDiv, 'average', 'Averages', 'Click to show Average over all Vaccine Stats', 'lightblue');
}

function addSelectControlItem(control, controlDiv, id, text, title, backgroundColor) {

    var controlUI = document.createElement('div');
    controlUI.id = 'controlUI';
    controlUI.title = title;
    controlUI.style.backgroundColor = backgroundColor;
    controlDiv.appendChild(controlUI);
    
    var controlText = document.createElement('div');
    controlText.innerHTML = text;
    controlText.id =  'controlText';
    controlUI.appendChild(controlText);
        
    controlUI.addEventListener('click', function () {
                
        mencControlUI.style.backgroundColor = 'white';
        dtapControlUI.style.backgroundColor = 'white';
        pvcControlUI.style.backgroundColor = 'white';
        hepbControlUI.style.backgroundColor = 'white';
        averageControlUI.style.backgroundColor = 'white';
        
        switch (id) {
            case 'menc':
                mencControlUI.style.backgroundColor = 'lightblue';
                break;
            case 'dtap':
                dtapControlUI.style.backgroundColor = 'lightblue';
                break;
            case 'pvc':
                pvcControlUI.style.backgroundColor = 'lightblue';
                break;
            case 'hepb':
                hepbControlUI.style.backgroundColor = 'lightblue';
                break;            
            case 'average':
                averageControlUI.style.backgroundColor = 'lightblue';
                break;
        }
        
        map.data.setStyle(function (feature) {
            var color = feature.getProperty(id + 'Color')
            return {
                fillColor : color,
                strokeWeight: 0.75
            };
        });
    });

    return controlUI
}