// DON'T FORGET TO CREATE A README.MD FILE BEFORE SUBMISSION!
// Step 1: Create buttons from gifArr
// Step 2: .on("click") buttons trigger the .ajax call to retrieve 10 gifs

$(document).ready(function() {
    var gifArr = ["Trending", "Oh no", "But why", "Yesss", "Nooo", "Ughh", "LOL", "Huh", "Deal with it", "Hungry"];

    function displayGifs() {
        var gifSearch = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=vy5Z2lJj2ZGlNkggKw2FIbyxEROEr5lU&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

        	var gifDiv = $("<div>");

        	for(var i = 0; i < response.data.length; i++){
	        	var gifRating = response.data[i].rating;
				var p = $("<p>").text("Rated: " + gifRating);
	        	gifDiv.append(p);

	        	var newGif = $("<img>").attr("src", stillGif);
	        	newGif.attr("class", "gif");

				var movingGif = response.data[i].images.fixed_height.url;
	        	newGif.attr("data-moving", movingGif);
	        	newGif.attr("data-state", "moving");
	        	

	        	var stillGif = response.data[i].images.fixed_height_still.url;
	        	newGif.attr("data-still", stillGif);
	        	newGif.attr("data-state", "still");

	        	gifDiv.append(newGif);
        	}

        	$("#gif-display").html(gifDiv);

        });
    }

    //Goes through gifArr to create buttons dynamically
    function displayButtons(){
    	$("#gif-buttons").empty();

    	// Generates buttons in gifArr
    	for(var i = 0; i < gifArr.length; i++){
    		var buttons = $("<button>");

    		buttons.addClass("gif");
    		buttons.attr("data-name", gifArr[i]);
    		buttons.text(gifArr[i]);

    		$("#gif-buttons").append(buttons);
    	}
    }
    // Pushes new gifs into the gifArr from the submission box
    $("#add-gif").on("click", function(event){
    	event.preventDefault();

    	var gifInput = $("#gif-input").val().trim();
		gifArr.push(gifInput);

    	displayButtons();
    });

    displayButtons();

    // Makes call to API to display gifs when button is clicked
    $(document).on("click", ".gif", displayGifs);

    // Triggers between still and moving gif when clicked on
    $(".gif").on("click", function(){
    	// debugger;
    	if($(this).attr("data-state") === "still"){
    		$(".gif").attr("src", "data-moving");
    		$(".gif").attr("data-state", "moving");
    		console.log("still");
    	}else if($(this).attr("data-state") === "moving"){
    		$(".gif").attr("src", "data-still");
    		$(".gif").attr("data-state", "still");
    		console.log("moving");
    	}
    });
});