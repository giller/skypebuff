//Switch the users Sykpe account name with their Handle
//Removed for github version
var users = { };

var allQuotes;


(function (){
	Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}
	var allQuotes = $('.quote-block');

	var xhr = createXHR();

	
	xhr.onreadystatechange = function(){
		if(xhr.readyState ==4){
			var uniqueNames = JSON.parse(xhr.responseText);
			
			$('#user').children().remove();

			var list = $('#user');
			for(var name in uniqueNames){
				if(name == "getKeyByValue") continue;
				console.log(name);
				uniqueNames[name] = users[uniqueNames[name]];
				list.append("<option>"+uniqueNames[name]+"</option>");	
			}
		}
	}

	xhr.open("GET", "api/users", true);
	xhr.send(null);
})();

$('#toggleBold').click(function (){
	$('.quote-contents').each(function(index) {
		if($(this).hasClass('bold')){
			$(this).removeClass('bold');
		}
		else {
			$(this).addClass('bold');
		}
	});
});

$('#updateButton').click(function (){
	var xhr = createXHR();
	
	var select = document.getElementById("user");
	var selection = select.options[select.selectedIndex].text;
	selection = users.getKeyByValue(selection);
	console.log(selection);

	var orderSelect = document.getElementById("order");
	var orderSelection = orderSelect.options[orderSelect.selectedIndex].value;
	console.log(orderSelection);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			var response = JSON.parse(xhr.responseText);
			console.log(response);
			clearQuotes();

			var container = $('#container');
			for(var quote in response){
				var timestamp = response[quote].timestamp;
				var date = new Date(timestamp*1000);

				container.append("<div class='quote-block'><h2 class='quote-contents'>"+response[quote].body+
					"</h2><p class='quote-author fancy'>"+response[quote].author+"</p>"
					+"<p class='quote-time fancy'>"+date+"</p>");
			}
		}
	}

	xhr.open("GET", "api/"+selection+"&"+orderSelection, true);
	xhr.send(null);	
});

function getDateFromTimestamp(date){

}

function clearQuotes() {
	$('.quote-block').remove();
}

function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e1) {
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e2) {
			}
		}
	}
	return null;
}
