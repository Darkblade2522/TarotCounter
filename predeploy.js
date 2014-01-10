(function(){
	
	console.log("Predeploy script");

	/* ========================================================
	 * ===== Launch bower to install frontend dependencies
	 * ======================================================== */ 
	console.log(" *** Running bower to install frontend dependencies *** ");
	var bower = require("bower");
	var path = require('path');
	
	bower.commands
		.install([path.resolve("./.bowerrc")])
		.on('end', function (installed) {
		    console.log(installed);
		});
	
	
	
	/* ========================================================
	 * ===== Checking database or create a new one
	 * ======================================================== */ 
	console.log(" *** Checking database *** ");
	
	var fs = require("fs");
	if (fs.existsSync("server/bdd.sqlite")){
		console.log("Database exists");
		return;
	}
	console.log("Database doesn't exist, creating database...");

})();