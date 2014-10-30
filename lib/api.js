var ApiController = function(database){
	this.db = database;
};

ApiController.prototype.getUsers = function(req, res){

	var names = [];
	var messages = this.db.collection("quotes");

	messages.find().toArray(function(err, array){

		var l = array.length;
		for(var i = 0; i < l; i++){
			if(names.indexOf(array[i].author) >= 0) continue;
			names.push(array[i].author);
		}
		res.json(names);
	});
};

ApiController.prototype.getAllQuotes = function(req, res){

	var quotes = this.db.collection("quotes");

	quotes.find().toArray(function(err, array){
		res.json(array);
	});
};

ApiController.prototype.getUserQuotes = function(req, res){
	
	/*if(!allowedIp(req.connection.remoteAddress)){
		res.status(400);
		res.send();
	}*/

	var user = req.param("user");
	var order = req.param("order");

	if(order == 1){
		var quotes = this.db.collection("quotes");

		quotes.find({author:user}, {sort: [['timestamp' ,'asc']] }).toArray(function(err, array){
			res.json(array);
		});
	} else {
			var quotes = this.db.collection("quotes");

		quotes.find({author:user}, {sort: [['timestamp','desc']] }).toArray(function(err, array){
			res.json(array);
		});
	}
};

ApiController.prototype.Test = function(){ console.log("hey"); };

module.exports = ApiController;

function allowedIp(ip){
	return(ip == "127.0.0.1");
}
