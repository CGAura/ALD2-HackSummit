exports.index = function (req, res) {
    res.render('index', { title: 'ALD2 - Node' });
};


exports.mapView = function (req, res){
    res.render('mapView', {});
}