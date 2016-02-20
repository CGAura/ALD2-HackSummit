var fastcsv = require('fast-csv');
var fastcsv = require('fast-csv');
var hospitalstream = fastcsv.createReadStream("./data/Hospital.csv");
csv
    .fromStream(hospitalstream, { headers: true, delimiters: '¬'})
    .on("data", function (data) {
       console.log(data);
     })
    .on("end", function () {
       console.log("done");
     });

var trustdata;

function unloadHospitalData(success) {
    trustdata = {};
    trustdata.trustName = "test";
    success();
}