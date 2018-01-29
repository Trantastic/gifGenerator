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

        	var gifDiv = $("<div class='gif'>");

        	for(var i = 0; i < 10; i++){
	        	var gifRating = response.data[i].rating;
				var p = $("<p>").text("Rated:" + gifRating);
	        	gifDiv.append(p);

	        	var actualGif = response.data[i].images.fixed_height.url;
	        	console.log(actualGif);

	        	var newGif = $("<img>").attr("src", actualGif);
	        	gifDiv.append(newGif);
        	}

        	$("#gif-display").html(gifDiv);

        })
    }

    //Goes through gifArr to create buttons dynamically
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

    $("#add-gif").on("click", function(event){
    	event.preventDefault();

    	var gifInput = $("#gif-input").val().trim();

    	gifArr.push(gifInput);

    	console.log(gifArr);

    	displayButtons();
    })

    displayButtons();
    $(document).on("click", ".gif", displayGifs);
})