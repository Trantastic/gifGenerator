// DON'T FORGET TO CREATE A README.MD FILE BEFORE SUBMISSION!
// Step 1: Create buttons from gifArr
// Step 2: .on("click") buttons trigger the .ajax call to retrieve 10 gifs

$(document).ready(function() {
    var gifArr = ["How dare you", "Oh no", "But why", "Yesss", "Nooo", "Ughh", "LOL", "Huh", "Deal with it", "Hungry"];

    function displayGifs() {
        var gifSearch = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=vy5Z2lJj2ZGlNkggKw2FIbyxEROEr5lU&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var gifDiv = $("<div>");

        	for(var i = 0; i < response.data.length; i++){
                //Creates a new div for each img to append to
                var newDiv = $("<div class='align'>");

	        	var gifRating = response.data[i].rating;
				var p = $("<p>").text("Rated: " + gifRating);
	        	newDiv.append(p);

                var movingGif = response.data[i].images.fixed_height.url;
                var stillGif = response.data[i].images.fixed_height_still.url;

	        	var newGif = $("<img>").attr("src", stillGif);
	        	newGif.attr("class", "gif");

				newGif.attr("data-moving", movingGif);
                newGif.attr("data-state", "moving");
	        	
	        	newGif.attr("data-still", stillGif);
	        	newGif.attr("data-state", "still");

                newDiv.append(newGif);

	        	gifDiv.append(newDiv);
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

    		buttons.addClass("gif-button text-white bg-primary");
    		buttons.attr("data-name", gifArr[i]);
    		buttons.text(gifArr[i]);

    		$("#gif-buttons").append(buttons);
    	}
    }

    // Pushes new gifs into the gifArr from the submission box
    $("#add-gif").on("click", function(event){
    	event.preventDefault();

    	var gifInput = $("#gif-input").val().trim();

        // Prevents user from creating a blank button
        if(gifInput.length !== 0){
            gifArr.push(gifInput);
        }

    	displayButtons();
        // Prevents duplicates and empties input box after submit is clicked
        $("#gif-input").val("");
    });

    displayButtons();

    // Makes call to API to display gifs when button is clicked
    $(document).on("click", ".gif-button", displayGifs);

    // Triggers between still and moving gif when clicked on
    $(document).on("click", ".gif", function(){
        console.log("I'm working", $(this));

    	// debugger;
    	if($(this).attr("data-state") === "still"){
    		$(this).attr("src", $(this).attr("data-moving"));
    		$(this).attr("data-state", "moving");
    		console.log("still");
    	}else if($(this).attr("data-state") === "moving"){
    		$(this).attr("src", $(this).attr("data-still"));
    		$(this).attr("data-state", "still");
    		console.log("moving");
    	}
    });
});