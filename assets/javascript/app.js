// play short song when page loads
//maybe lay it instead when a gif is added
// $(document).ready(function() {
//     $("#my-audio").get(0).play();
// });

//==================================================================
		//SETUP VARIABLES
//==================================================================

// Initial array of gifs
// search terms automatically have adventure+time+ in front of them when searched
var gifsArray = ["Jake", "Finn", "BMO", "bubblegum", "tree trunks", "lumpy", "marceline", "lemongrab", "rainicorn", "gunter", "friends", "love", "swords", "flame"]
console.log(gifsArray);

var authKey 	= "&api_key=CwbAFzMwgWSjct9g4aWrQWAcl9ZiBO78";

//search parameters
var queryTerm 	= "";
var numResults 	= 0;
var rating 		= "";

//URL base
var queryURLBase = "http://api.giphy.com/v1/gifs/search?q=adventure+time";

//control number of gifs
var gifCounter 	= 0;

//==================================================================
		//FUNCTIONS
//==================================================================
//AJAX call
function runQuery(numGifs, queryURL){

	// AJAX function
	$.ajax({url: queryURL, method: "GET"})
		.done(function(giphyData) {

			console.log(giphyData);
			console.log(queryURL);
		})
}

//==================================================================
		//MAIN PROCESSES (CALLS)
//==================================================================
$("#submit-button").on("click", function() {

	queryTerm = $("#search").val().trim();
	console.log(queryTerm);

	var newURL = queryURLBase + "+" + queryTerm + authKey;
	console.log(newURL);

	// runQuery(10, "http://api.giphy.com/v1/gifs/search?q=adventure+time+&api_key=CwbAFzMwgWSjct9g4aWrQWAcl9ZiBO78");
	
	return false;
})