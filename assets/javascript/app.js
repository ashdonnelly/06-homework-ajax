var topics ["jake the dog", "finn the human", "BMO", "princess bubblegum",
 "ice king", "tree trunks", "lumpy space princess", "marceline", "rainicorn"]

$("#cat-button").on("click", function() {

      // Storing our giphy API URL for images
      var queryURL = "https://api.giphy.com/GET/v1/gifs/search/api_key=CwbAFzMwgWSjct9g4aWrQWAcl9ZiBO78";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {

        // Saving the image_original_url property
        var imageUrl = response.data.image_original_url;

        // Creating and storing an image tag
        var gif = $("<img>");

        // Setting the catImage src attribute to imageUrl
        gif.attr("src", imageUrl);
        gif.attr("alt", "adventure time gif");

        // Prepending the catImage to the images div
        $("#gifs").prepend(gif);
      });
    });