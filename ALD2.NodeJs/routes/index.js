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
exports.mapJsonData = function (req, res) {
    
    loadData.load(function (groups) { 
        
    var parser = new xml2js.Parser();
    fs.readFile("./data/CCC_Data.KML", function (err, data) {
        parser.parseString(data, function (err, result) {
            console.dir(result);
            var finalData = {
                type: "FeatureCollection",
                features: new Array()
            };
            var counter = 0;
            result.kml.Folder[0].Placemark.forEach(function (placemark){
                if (true == false) {
                    console.log(counter);
                }
                else {
                    counter++;
                    
                        try {
                            var groupIndex = _.find(groups, function (o) { return o.ccgcode == placemark.name[0] });
                            var setColor = '#888888';
                            if (groupIndex) {
                                setColor = groupIndex.colour;
                            }
                        var cccData = {
                            type: "Feature",
                            geometry: {
                                type: "Polygon",
                                coordinates: [
                                    new Array()
                                ]
                            },
                            properties: {
                                ccgCode: placemark.name[0],
                                color: setColor,
                                //                desc: placemark.description[0]
                                prop0: "value0",
                                prop1: {
                                    "this" : "that"
                                }
                            }
                        };
                        
                        name = cccData.name;
                        if (name === "05Q") {
                            console.log(name);
                        }
                        var outerBoundry;
                        if (placemark.Polygon) {
                            outerBoundry = placemark.Polygon[0].outerBoundaryIs[0];
                        }
                        else if (placemark.MultiGeometry) {
                            outerBoundry = placemark.MultiGeometry[0].Polygon[0].outerBoundaryIs[0]
                        }
                        
                        var coordinates = outerBoundry.LinearRing[0].coordinates[0];
                        var counter = 0;
                        coordinates.split('\n').forEach(function (splitOne) {
                            var trimmed = splitOne.trim();
                            var longLatArray = trimmed.split(',');
                            if (trimmed != "") {
                               

                                var points = new Array();
                                points.push(parseFloat(longLatArray[0]));
                                points.push(parseFloat(longLatArray[1]));
                                    cccData.geometry.coordinates[0].push(points);
                                
                                
                            }
                        });
                        
                        finalData.features.push(cccData);
                    }
                catch (exx) {
                        console.log(name + exx);
                    }
                }
            });

            console.log('Done');
            res.send(finalData);
        });
    });
    });
}