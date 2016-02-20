var loadData = require('../LoadData.js')
    
exports.index = function (req, res) {

    loadData.load(function (hospitals) {
        console.log(hospitals.length);
        hospitals.forEach(
            function (hospital) {
                res
                .write(hospital);
            }
        );
        
        res.end();

    });
};


exports.mapView = function (req, res){
    res.render('mapView', {});
}