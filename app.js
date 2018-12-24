var express = require('express');
var app = express();

//NOT GOOD TO STATIC WHOLE ROOT. CHANGE WHEN CHANGING FRONT END RESOURCE LINKS.
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})