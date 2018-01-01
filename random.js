var http    = require('http');
var server  = http.createServer();
var port    = process.env.PORT || 9001;

var admin = require("firebase-admin");
var serviceAccount = 'JSON_FILE_FOR_AUTHENTICATION'					// Replace this

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'DATABASE_URL',										// Replace this
});

server.listen(port);

server.once('request', function(req, res){
	var db = admin.database();
	var ref = db.ref("/");
	ref.once("value", function(snapshot) {
		fData = snapshot.val()
		console.log(fData);
	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
});

server.on('listening', function(){
  console.log('# Visit http://localhost:' + port);
});

server.on('error', function(err){
  console.log(err);
});
