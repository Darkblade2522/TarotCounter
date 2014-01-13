var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("server/bdd.sqlite");

//TODO Updates
exports.createDatabase = function(){
	fs.readFile('./db01.sql', function (err, data) {
		if (err)
			throw err;
		else
			db.serialize(function() {
				db.exec(data);
			});
	});
};
exports.addPlayer = function(pName){
	db.serialize(function() {
		var query = db.prepare("INSERT INTO t_players (name) VALUES (?);");
		query.run(pName);
		query.finalize();
	});
};
exports.getPlayers = function(callback){
	var lPlayers = [];
	db.each("SELECT name FROM t_players;", function(err, row) {
		if (err != undefined)
			console.log(err);
		else
			lPlayers.push(row.name);
	}, function(err, numrows){
		if (err != undefined)
			console.log(err);
		else if (typeof callback == 'function') 
			callback(lPlayers);
	});
};
