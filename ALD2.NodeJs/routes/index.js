var loadData = require('../LoadData.js')
    
exports.index = function (req, res) {
    loadData.load(function (groups) {
        console.log(groups.length);
        groups.forEach(
            function (group) {
                res
                .write(group.ccgname + " " + group.colour + "\n");
            }
        );
        
        res.end();

    });
};


exports.mapView = function (req, res) {
    loadData.load(function (groups) {
        res.render('mapView', {});
    })
}


var fs = require('fs'),
    xml2js = require('xml2js'),
    _ = require('lodash');

var name = "";

function getGroupColor(groupIndex){
    var setColor = '#888888';
    if (groupIndex) {
        setColor = groupIndex.colour;
    }
    return setColor;
}

function GetNewCccData(name, groupIndex){
    var data = {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [
                new Array()
            ]
        },
        properties: {
            ccgCode:name,
            color: getGroupColor(groupIndex)
        }
    };
    return data;
}

function GetCoordinates(placemark){
    var outerBoundry;
    if (placemark.Polygon) {
        outerBoundry = placemark.Polygon[0].outerBoundaryIs[0];
    }
    else if (placemark.MultiGeometry) {
        outerBoundry = placemark.MultiGeometry[0].Polygon[0].outerBoundaryIs[0]
    }
    var coordinates = outerBoundry.LinearRing[0].coordinates[0];

    return coordinates;
}

function ConvertCoordinateLine(line){
    var trimmed = line.trim();
    if (trimmed != "") {
        var longLatArray = trimmed.split(',');
        var points = new Array();
        points.push(parseFloat(longLatArray[0]));
        points.push(parseFloat(longLatArray[1]));
        return points;
    }

    return false;
}

exports.mapJsonData = function (req, res) {    
    loadData.load(function (groups) {        
        var parser = new xml2js.Parser();
        fs.readFile("./data/CCC_Data.KML", function (err, data) {
            parser.parseString(data, function (err, result) {
                var finalData = {
                    type: "FeatureCollection",
                    features: new Array()
                };
                result.kml.Folder[0].Placemark.forEach(function (placemark) {
                    try {
                        var groupIndex = _.find(groups, function (o) { return o.ccgcode == placemark.name[0] });                        
                        var cccData = GetNewCccData(placemark.name[0], groupIndex);                        
                        var coordinates = GetCoordinates(placemark);                                                
                        coordinates.split('\n').forEach(function (splitOne) {
                            var line = ConvertCoordinateLine(splitOne);     
                            if (line){
                                cccData.geometry.coordinates[0].push(line);
                            }
                        });                        
                        finalData.features.push(cccData);
                    }
                    catch (exx) {
                        console.log(name + exx);
                    }                
                });
                res.send(finalData);
            });
        });
    });
}