module.exports = function(app, leaderboardRepository){

    app.get('/leaderboard/all', function(req, res){
        leaderboardRepository.getAll(function(records) {
            res.status(200).json(records);
        });
    });

    app.get('/leaderboard/add', function(req, res){
        leaderboardRepository.add("Christopher", 12345, function() {
            res.status(200);
        });
    });
    
}