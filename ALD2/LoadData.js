var fs = require('fs');
var csv = require('fast-csv');

module.exports = {
    load: function (success) {
        
        var stream = fs.createReadStream("./data/CCGImmunisation.csv");
        var groups = Array();

    csv 
    .fromStream(stream, {headers : true})
    .on("data", function (data) {
            //Dtap/IPV/Hib,MenC,PCV,HepB
            var floatMenC = parseFloat(data.MenC);
            var floatDtap = parseFloat(data.Dtap);
            var floatPCV = parseFloat(data.PCV);
            var floatHepB = parseFloat(data.HepB);

            data.menCColor = utils.setColor(floatMenC);
            data.dtapColor = utils.setColor(floatDtap);
            data.pvcColor = utils.setColor(floatPCV);
            data.hepBColor = utils.setColor(floatHepB);
            data.color = utils.setColor(utils.getAverageColor(floatMenC, floatDtap, floatPCV, floatHepB));
            groups.push(data);
        })
    .on("end", function () {
            success(groups);
        });
    }
}

var utils = {
    setColor: function (percent){

        var color = "#ff0000";

        if (percent > 90.0) {
            color = "#00ff00";
        } else if (percent > 60) {
            color = "#f2ff00";
        }
        else if (percent > 30) {
            color = "#ffbb00";
        }
        return color 
    },
    getAverageColor: function (menC, Dtap, PCV, HepB){
        return (menC + Dtap + PCV + HepB) / 4;
    }
}



