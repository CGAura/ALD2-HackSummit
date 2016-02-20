var fs = require('fs');
var csv = require('fast-csv');

module.exports = {
    load: function (success) {
        
        var stream = fs.createReadStream("./data/AEWaitingTimes1215.csv");
        var hospitals = Array();

    csv 
    .fromStream(stream, {headers : true})
    .on("data", function (data) {
            hospitals.push(data.Name);
        })
    .on("end", function () {
            success(hospitals);
        });
    }
};



