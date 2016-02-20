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
    xml2js = require('xml2js');

var name = "";
exports.mapJsonData = function (req, res) {
    var parser = new xml2js.Parser();
    fs.readFile("./data/CCC_Data.KML", function (err, data) {
        parser.parseString(data, function (err, result) {
            console.dir(result);
            var finalData = {
                type: "FeatureCollection",
                features: new Array()
            };
            
            result.kml.Folder[0].Placemark.forEach(function (placemark){
                try {
                    var cccData = {
                        type: "Feature",
                        coordinates: new Array(),
                        name: placemark.name[0],
                        desc: placemark.description[0],
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
                    coordinates.split('\n').forEach(function (splitOne) {
                        var trimmed = splitOne.trim();
                        var longLatArray = trimmed.split(',');
                        if (trimmed != "") {
                            var points = new Array();
                            points.push(longLatArray[0]);
                            points.push(longLatArray[1]);
                            cccData.coordinates.push(points);
                        }
                    });
                    
                    finalData.features.push(cccData);
                }
                catch (exx) {
                    console.log(name + exx);
                }
            });

            console.log('Done');
            res.send(finalData);
        });
    });
}