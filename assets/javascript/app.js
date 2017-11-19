// play short song when page loads
$(function() {
    $("#audio").get(0).play();
    populateButtons(searchArray, "search-button", "#buttons-area");
});

//==================================================================
		//SETUP VARIABLES
//==================================================================

// Initial array of gifs
var searchArray = ["Jake", "Finn", "BMO", "Princess Bubblegum", "Tree Trunks", "food", "Lumpy Space Princess", "Marceline", "best friends", "Lemongrab", "Rainicorn", "Gunter", "love"]
console.log(searchArray);

// var authKey 	= "&api_key=CwbAFzMwgWSjct9g4aWrQWAcl9ZiBO78";

// var rating 		= "";

// //search parameters
// var queryTerm 	= "";

// //URL base
// // search terms automatically have adventure+time+ in front of them when searched
// var queryURLBase = "https://api.giphy.com/v1/gifs/search?q=adventure+time";

//==================================================================
		//FUNCTIONS
//==================================================================

function populateButtons(searchArray, classToAdd, areaToAddTo) {

	//delete gif buttons in area
	$(areaToAddTo).empty();

	//loop through gifs array
	for (var i = 0; i < searchArray.length; i++) {

		//dynamically generate buttons for each word in array
		var a = $("<button>");

		//add class
		// a.addClass("gif-button-new btn btn-sm btn-info");
		a.addClass(classToAdd);

		//add data-attribute with a value of gif at index i
		a.attr("data-type", searchArray[i]);

		//provide the button's text with a value of the gif at index i
		a.text(searchArray[i]);

		//add the button to the html
		$(areaToAddTo).append(a);
	}
}


//==================================================================
		//MAIN PROCESSES/CALLS
//==================================================================

$(document).on("click",".search-button", function() {
	var type = $(this).data("type");
	console.log(type);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=adventure+time+show+" + type + "&api_key=CwbAFzMwgWSjct9g4aWrQWAcl9ZiBO78&limit=10";
	$.ajax({url: queryURL,
		method: "GET"
	})
		.done(function(response) {
			for (var i=0; i<response.data.length; i++) {
				var searchDiv = $("<div class='search-item'>");
				var rating = response.data[i].rating;
				var p = $("<p>").text("Rating: " + rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $("<img>");
				image.attr("src", still);
				image.attr("data-still", still);
				image.attr("data-animated", animated);
				image.attr("data-state", "still");
				image.addClass("search-image");
				searchDiv.append(p);
				searchDiv.append(image);
				$("#searches").prepend(searchDiv);
			}
		})
})

//animate when clicked or pause when clicked
$(document).on("click",".search-image", function() {
	var state = $(this).attr("data-state");
	if (state == "still") {
		$(this).attr("src", $(this).data("animated"));
		$(this).attr("data-state", "animated");
	} else {
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still");
	}
})

//add in new buttons
$("#add-search").on("click", function() {
	var newSearch = $("input").eq(0).val();
	searchArray.push(newSearch);
	populateButtons(searchArray, "search-button", "#buttons-area");
	return false;
})

//handles events where submit button is clicked
// $("#submit-button").on("click", function(event) {

// 	//prevent form from submitting itself
// 	event.preventDefault();

// 	//grab text from input box
// 	var newGif = $("#search").val().trim();

// 	//gif from input box is added to searchArray
// 	searchArray.push(newGif);

// 	//re-process searchArray
// 	renderButtons();
// });

//make new gif buttons
// $("#submit-button").on("click", function() {

// 	// grab search from input and make it queryTerm with outer spaces trimmed
// 	queryTerm = $("#search").val().trim();
// 	console.log(queryTerm);

// 	//replace inner phrase spaces with +
// 	var spacelessQueryTerm = queryTerm.replace(/\s/g, "+");

// 	// URL base + search term without spaces + auth key + limit results to 10 gifs
// 	var newURL = queryURLBase + "+" + spacelessQueryTerm + authKey + "&limit=10";

// 	console.log(newURL);
	
// 	return false;
// });

// renderButtons();

//button click shows gifs
// $(".gif-button-new").on("click", function() {

// 	//refer to the text of button that was clicked
// 	var selectedGif = $(this).attr("data-name");

// 	console.log(selectedGif);

// 	var queryURLSelected = queryURLBase + "+" + selectedGif + authKey + "&limit=10";

// 	//remove inner spaces
// 	// var spacelessSelectedGif = selectedGif.replace(/\s/g, "+");

// 	// console.log(spacelessSelectedGif);

// 	//construct url to search for name of selected gif button
// 	// var queryURLSelected = queryURLBase + "+" + spacelessSelectedGif + authKey + "&limit=10";

// 	console.log(queryURLSelected);

// 	//ajax get request
// 	$.ajax({
// 		url: queryURLSelected,
// 		method: "GET"
// 	})

// 	//data comes back from api
// 	.done(function(response) {

// 		console.log(queryURLSelected);
// 		console.log(response);

// 		// storing array of results in results var
// 		var results = response.data;

// 		// looping over every result item
// 		for (var i = 0; i < results.length; i++) {

// 			//only taking action if the gif is appropraite
// 			if (results[i].rating !== "r" && results[i].rating !=="pg-13") {

// 				// create a div with the class "item" with an <hr> above it
// 				var gifDiv = $("<div class='item'><hr>");

// 				//store the rating
// 				var rating = results[i].rating;

// 				//create paragraph to hold rating
// 				var p = $("<p class='rating'>").text("rated: " + rating);

// 				//create image tag
// 				var gifImage = $("<img class='img-move'>");

// 				//give image tag a src attr of a property pulled from result item
// 				gifImage.attr("src", results[i].images.fixed_height.url);

// 				//append the p and gifImage to the gifDiv
// 				gifDiv.append(p);
// 				gifDiv.append(gifImage);

// 				//prepend the gifDiv to #gifs-display from html
// 				$("#gifs-display").prepend(gifDiv);
// 			};
// 		};

// 	});

// });

// $(".img-move").on("click", function() {

//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");

//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
// 	   	$(this).attr("src", $(this).attr("data-animate"));
// 	    $(this).attr("data-state", "animate");
//     } else {
// 	    $(this).attr("src", $(this).attr("data-still"));
// 	    $(this).attr("data-state", "still");
//     }
// });
