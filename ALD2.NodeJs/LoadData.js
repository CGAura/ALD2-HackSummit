var fs = require('fs');
var csv = require('fast-csv');

module.exports = {
    load: function (success) {
        
        var stream = fs.createReadStream("./data/CCGImmunisation.csv");
        var groups = Array();

    csv 
    .fromStream(stream, {headers : true})
    .on("data", function (data) {

            data.colour = "#ff0000";

            var floatMenC = parseFloat(data.MenC);

            if (floatMenC > 90.0) {
                data.colour = "#00ff00";
            } else if (floatMenC > 60) {
                data.colour = "#f2ff00";
            }
            else if (floatMenC > 30) {
                data.colour = "#ffbb00";
            }

            groups.push(data);
        })
    .on("end", function () {
            success(groups);
        });
    }
};



