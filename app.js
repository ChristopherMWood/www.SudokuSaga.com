function startServer() {
  var express = require('express')
  var app = express()
  var path = require('path')
  var mysql = require('mysql')
  var uuidGenerator = require('uuid/v4');

  var connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "password",
    database: "sudokusaga"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Log: sql successfully connected");
  });

  var leaderboardRepository = require('./src/js/repositories/leaderboardRepository.js');

  app.use(express.static(path.join(__dirname, '/src/views')))
  app.use(express.static(path.join(__dirname, '/src/img')))
  app.use(express.static(path.join(__dirname, '/src/css')))
  app.use(express.static(path.join(__dirname, '/src/js')))


  require(path.join(__dirname, '/src/routes/leaderboardApiRoutes.js'))(app, new leaderboardRepository(connection, uuidGenerator));
  require(path.join(__dirname, '/src/routes/viewRoutes.js'))(app);

  var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('SudokuSaga running on http://%s:%s', host, port)
  })

  return server;
}

module.exports = startServer