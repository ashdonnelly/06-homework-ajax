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
var gifsArray 	= ["Jake", "Finn", "BMO", "Bubblegum", "Trunks", "pie", "Space", "Marceline", "friends", "Lemongrab", "Rainicorn", "Gunter", "love"]
console.log(gifsArray);

var authKey 	= "&api_key=CwbAFzMwgWSjct9g4aWrQWAcl9ZiBO78";

//don't know if I even need this
var rating 		= "";

//search parameters
var queryTerm 	= "";

//URL base
var queryURLBase = "https://api.giphy.com/v1/gifs/search?q=adventure+time";

// //control number of gifs
// var gifCounter 	= 0;

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

	// grab search from input and make it queryTerm with outer spaces trimmed
	queryTerm = $("#search").val().trim();
	console.log(queryTerm);

	// URL base + search term + auth key + limit results to 10 gifs + language english + size 200
	var newURL = queryURLBase + "+" + queryTerm + authKey + "&limit=10&lang=en&fixed_height=200";
	console.log(newURL);
	
	return false;
});

$("#button").on("click", function() {
	var gif = $(this).attr("data-")
});