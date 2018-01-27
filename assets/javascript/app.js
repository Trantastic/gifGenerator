// DON'T FORGET TO CREATE A README.MD FILE BEFORE SUBMISSION!
// Step 1: Create buttons from gifArr
// Step 2: .on("click") buttons trigger the .ajax call to retrieve 10 gifs

$(document).ready(function() {
    var gifArr = ["Trending", "Oh no", "But why", "Yesss", "Nooo", "Hangry"];


    function displayGifs() {
        var gifSearch = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=vy5Z2lJj2ZGlNkggKw2FIbyxEROEr5lU&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

        	// Include code to retrieve gifs and their ratings (rating) when button is clicked
        	console.log(response.data[0].images.fixed_height.url);

        	var gifDiv = $("<div class='gif'>");

        	var gifRating = response.rating;
			var p = $("<p>").text("Rated:" + gifRating);
        	gifDiv.append(p);

        	var actualGif = response.data.images.fixed_height;
        	var iFrame = $("<iframe>").text(actualGif);
        	gifDiv.append(iFrame);

        	$("#gif-display").prepend(gifDv);

        })
    }

    // Goes through gifArr to create buttons dynamically
    function displayButtons(){
    	$("#gif-buttons").empty();

    	for(var i = 0; i < gifArr.length; i++){
    		var buttons = $("<button>");

    		buttons.addClass("gif");
    		buttons.attr("data-name", gifArr[i]);
    		buttons.text(gifArr[i]);

    		$("#gif-buttons").append(buttons);
    	}
    }

    displayButtons();
    $(document).on("click", ".gif", displayGifs);
})