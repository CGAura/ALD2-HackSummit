var http = require('http');

var mapConfig = {
    apiKey: "ApOfrcyr6h0I1xSrw_V6XYAiS0a-P-H0byrMPXEyGx4SKtvIUnz2J4i8HAb3hnSy",
    host: "http://dev.virtualearth.net",
    startPath: "/REST/V1/Routes/Driving?"        
};

module.exports = {
    getDistance: function (pos1, pos2) {
    var fullUrl  =  mapConfig.startPath + "wp.0=" + pos1.long + "," + pos1.lat + "&wp.1=" + pos2.long + "," + pos2.lat + "&key=" + mapConfig.apiKey;
        
        
        var http = require('http');
        
        //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
        var options = {
            host: mapConfig.host,
            path: fullUrl
        };
        
        callback = function (response) {
            var str = '';
            
            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });
            
            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log(str);
            });
        }
        
        http.get(options, callback).end();

    }
};





