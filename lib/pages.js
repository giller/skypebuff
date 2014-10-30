var Test = function(msg){
	this.message = "undefined message";
	this.message = msg;
};

Test.prototype.print = function(){
	console.log(this.message);	
};

//module.exports = Test;
//module.exports = function(){
//	return new Test("haha");
//}

var pageController = function(database){
	this.db = "something";
	this.db = database;
};

pageController.prototype.print = function(){
	console.log(this.db);
};

pageController.prototype.Home = function(req, res){
	if(this.db){
		var mongo = this.db;
		var quotes = this.db.collection('quotes');

		quotes.find({}, {sort: [['timestamp','desc']] }).toArray(function(err, cursor){
			var meta = mongo.collection('meta');
			meta.find().toArray(function(err, result){
				console.log(result[0]);
				cursor.timeMeta = result[0].quotesLastUpdatedTime;
				res.render('layout', cursor);
			});
		});

	}
	else{
		console.log("NO DB!");
		res.send("error");
	}
};

pageController.prototype.Update = function(req, res){
	if(this.db){
		var body = req.body;
		
		var Entities = require('html-entities').XmlEntities;
		entities = new Entities();
		
		for(var i = 0; i < body.length; i++){
			var thisbody = body[i].body;

			if(thisbody.indexOf("<legacyquote>") >= 0){
				var parsedQuote = removeCharacters(thisbody);

				console.log("returned quote is : " +parsedQuote);
				body[i].body = parsedQuote;
				console.log("body is now : "+body[i].body);
			}

			thisbody = body[i].body;
			if(thisbody.indexOf("&lt;") >= 0){
				console.log("&lt; replaced");
				thisbody = thisbody.replace("/&lt;/g", "<");
				if(body[i].body.indexOf('\n') >= 0) body[i].body.replace(/[\r\n]/g, '');
				body[i].body = entities.decode(thisbody);
				console.log("new body : " + body[i].body);
			}
		}

		var messages = this.db.collection('quotes');
		
		for(var j = 0; j < body.length; j++)
		{
			//removed callback 
			insertWrapper(messages, body[j]);
		}

		var meta = this.db.collection('meta');
		var currentTime = new Date().toString();
		meta.update({name:"quoteLastUpdated"}, {name:"quoteLastUpdated", quotesLastUpdatedTime: currentTime}, function(err, record){
			console.log("record added");
		});

		res.status(200);
		res.send();	

	}
	else {
		console.log("NO DB!");
		res.send("error");
	}
};

function removeCharacters(message){
	var returnmessage = "black";
	var stringParser = require('xml2js').parseString;
	stringParser(message, function(err, json){
			//console.log(json);
			json.quote.legacyquote[0].replace('\r', '');
			json.quote.legacyquote[0].replace('\n', '');
			json.quote.legacyquote[0].replace(' ', '');
			json.quote.legacyquote[0].replace(',', '');
			returnmessage = json.quote.legacyquote[0] + json.quote._;
			//console.log(returnmessage);
			//console.log(message);
	});

	return returnmessage;
}

function insertWrapper(collection, items){
	collection.insert(items, function(err, result){
		console.log(result+" added to db");
	});
}

module.exports = pageController;
