class leaderboardRepository {
    constructor(connection, uuidGenerator) {
        this.connection = connection;
        this.uuidGenerator = uuidGenerator;
    }

    getAll(callback) {
        this.connection.query("SELECT * FROM leaderboard", function (err, result, fields) {
            if (err) throw err;
            var leaderboardRecords = [];

            result.forEach(function(record){
                leaderboardRecords.push(record);
             });

             return callback(leaderboardRecords);
        });
    };

    add(name, score, callback) {
        var uuid = this.uuidGenerator();
        var sql = 'INSERT INTO leaderboard (id, name, score) VALUES (\'' + uuid + '\', \'' + name + '\', ' + score + ')';
        this.connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback();
        });
    };

};

module.exports = leaderboardRepository;