// play short song when page loads
$(document).ready(function() {
    $("#my-audio").get(0).play();
});

//==================================================================
		//SETUP VARIABLES
//==================================================================

// Initial array of gifs
var gifsArray 	= ["Jake", "Finn", "BMO", "Princess Bubblegum", "Tree Trunks", "pie", "Lumpy Space Princess", "Marceline", "best friends", "Lemongrab", "Rainicorn", "Gunter", "love"]
console.log(gifsArray);

var authKey 	= "&api_key=CwbAFzMwgWSjct9g4aWrQWAcl9ZiBO78";

var rating 		= "";

//search parameters
var queryTerm 	= "";

//URL base
// search terms automatically have adventure+time+ in front of them when searched
var queryURLBase = "https://api.giphy.com/v1/gifs/search?q=adventure+time";

// //control number of gifs
// var gifCounter 	= 0;

//==================================================================
		//FUNCTIONS
//==================================================================

//AJAX call
// function runQuery(queryURL){

// 	// AJAX function
// 	$.ajax({url: queryURL, method: "GET"})
// 		.done(function(giphyData) {

// 				console.log(giphyData.response.data[0].url);
// 				console.log(giphyData.response.data[0].rating);

// 			for (var i = 0; i < giphyData.response.data.length; i++) {

// 			}

// 			console.log(queryURL);
// 		});
// };

//make buttons
function renderButtons() {

	//delete gif buttons
	$("#buttons-display").empty();

	//loop through gifs array
	for (var i = 0; i < gifsArray.length; i++) {

		//dynamically generate buttons for each word in array
		var a = $("<button>");

		//add class
		a.addClass("gif-button-new btn btn-sm btn-info");

		//add data-attribute with a value of gif at index i
		a.attr("data-name"), gifsArray[i];

		//provide the button's text with a value of the gif at index i
		a.text(gifsArray[i]);

		//add the button to the html
		$("#buttons-display").append(a);
	};
};


//==================================================================
		//MAIN PROCESSES/CALLS
//==================================================================

//handles events where submit button is clicked
$("#submit-button").on("click", function(event) {

	//prevent form from submitting itself
	event.preventDefault();

	//grab text from input box
	var newGif = $("#search").val().trim();

	//gif from input box is added to gifsArray
	gifsArray.push(newGif);

	//re-process gifsArray
	renderButtons();
});

//make new gif buttons
$("#submit-button").on("click", function() {

	// grab search from input and make it queryTerm with outer spaces trimmed
	queryTerm = $("#search").val().trim();
	console.log(queryTerm);

	//replace inner phrase spaces with +
	var spacelessQueryTerm = queryTerm.replace(/\s/g, "+");

	// URL base + search term without spaces + auth key + limit results to 10 gifs
	var newURL = queryURLBase + "+" + spacelessQueryTerm + authKey + "&limit=10";

	console.log(newURL);
	
	return false;
});

renderButtons();

//button click shows gifs
$(".gif-button-new").on("click", function() {

	//refer to the text of button that was clicked
	var selectedGif = $(this).attr("data-name");

	console.log(selectedGif);

	var queryURLSelected = queryURLBase + "+" + selectedGif + authKey + "&limit=10";

	//remove inner spaces
	// var spacelessSelectedGif = selectedGif.replace(/\s/g, "+");

	// console.log(spacelessSelectedGif);

	//construct url to search for name of selected gif button
	// var queryURLSelected = queryURLBase + "+" + spacelessSelectedGif + authKey + "&limit=10";

	console.log(queryURLSelected);

	//ajax get request
	$.ajax({
		url: queryURLSelected,
		method: "GET"
	})

	//data comes back from api
	.done(function(response) {

		console.log(queryURLSelected);
		console.log(response);

		// storing array of results in results var
		var results = response.data;

		// looping over every result item
		for (var i = 0; i < results.length; i++) {

			//only taking action if the gif is appropraite
			if (results[i].rating !== "r" && results[i].rating !=="pg-13") {

				// create a div with the class "item" with an <hr> above it
				var gifDiv = $("<div class='item'><hr>");

				//store the rating
				var rating = results[i].rating;

				//create paragraph to hold rating
				var p = $("<p class='rating'>").text("rated: " + rating);

				//create image tag
				var gifImage = $("<img class='img-move'>");

				//give image tag a src attr of a property pulled from result item
				gifImage.attr("src", results[i].images.fixed_height.url);

				//append the p and gifImage to the gifDiv
				gifDiv.append(p);
				gifDiv.append(gifImage);

				//prepend the gifDiv to #gifs-display from html
				$("#gifs-display").prepend(gifDiv);
			};
		};

	});

});

$(".img-move").on("click", function() {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");

    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
	   	$(this).attr("src", $(this).attr("data-animate"));
	    $(this).attr("data-state", "animate");
    } else {
	    $(this).attr("src", $(this).attr("data-still"));
	    $(this).attr("data-state", "still");
    }
});
