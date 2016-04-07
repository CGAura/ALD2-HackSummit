
var fs = require('fs'),
    xml2js = require('xml2js'),
    _ = require('lodash'),
    loadData = require('./LoadData.js');
var name = "";

module.exports = {
    buildData : function (success){
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
                            var cccData = utils.GetNewCccData(placemark.name[0], groupIndex);
                            var coordinates = utils.GetCoordinates(placemark);
                            coordinates.split('\n').forEach(function (splitOne) {
                                var line = utils.ConvertCoordinateLine(splitOne);
                                if (line) {
                                    cccData.geometry.coordinates[0].push(line);
                                }
                            });
                            finalData.features.push(cccData);
                        }
                    catch (exx) {
                            console.log(name + exx);
                        }
                    });
                    success(finalData);

                });
            });
        });

    }

}
var utils = {
    GetCoordinates: function (placemark) {
        var outerBoundry;
        if (placemark.Polygon) {
            outerBoundry = placemark.Polygon[0].outerBoundaryIs[0];
        }
        else if (placemark.MultiGeometry) {
            outerBoundry = placemark.MultiGeometry[0].Polygon[0].outerBoundaryIs[0]
        }
        var coordinates = outerBoundry.LinearRing[0].coordinates[0];
        
        return coordinates;
    },
    ConvertCoordinateLine: function (line) {
        var trimmed = line.trim();
        if (trimmed != "") {
            var longLatArray = trimmed.split(',');
            var points = new Array();
            points.push(parseFloat(longLatArray[0]));
            points.push(parseFloat(longLatArray[1]));
            return points;
        }
        
        return false;
    },
    GetNewCccData: function (name, groupIndex) {
        var data = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    new Array()
                ]
            },
            properties: {
                ccgCode: name,
                averageColor: utils.getGroupColor(groupIndex, 'color'),
                mencColor: utils.getGroupColor(groupIndex, 'menCColor'),
                dtapColor: utils.getGroupColor(groupIndex, 'dtapColor'),
                hepbColor: utils.getGroupColor(groupIndex, 'hepBColor'),
                pvcColor: utils.getGroupColor(groupIndex, 'pvcColor')
            }
        };
        return data;
    },
    getGroupColor: function (groupIndex, vaccName) {
        var setColor = '#888888';
        if (groupIndex) {
            setColor = groupIndex[vaccName];
        }
        return setColor;
    }

}
