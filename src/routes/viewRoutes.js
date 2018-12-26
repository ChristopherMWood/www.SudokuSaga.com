var path = require('path')

module.exports = function(app){
    app.get('/', function (request, response) {
      response.sendFile(getViewRoute('index'));
    });
  
    app.use(function (request, response) {
      response.sendFile(getViewRoute('404'));
    });
   
    function getViewRoute(filename) {
      return path.join(__dirname, '/../views/', filename + '.html');
    }
  }
  