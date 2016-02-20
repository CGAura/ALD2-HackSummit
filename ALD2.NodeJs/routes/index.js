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


exports.mapView = function(req, res) {
    loadData.load(function(groups) {
        res.render('mapView', {});
    });
};