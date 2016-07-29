$(document).ready(function(){

	//Assign HTML elements to variables
	var animalButtonsList = $("#animalButtons");
	var animalInput = $("#animal-input");
	var addAnimalButton = $("#addAnimal");
	var gifDiv = $("#animals");
	var animalsArray = [];

 	//When animal button is clicked...
 	addAnimalButton.on("click", function(){

 		//Empty out the previous list of buttons
 		//Animal becomes the string that was typed in 		
 		animalButtonsList.empty();
    	var animal = animalInput.val();

    	//An animal shall only be added to the animals array if it hasnt been put in before
		for (i=0; i<animalsArray.length; i++){
			if (animal == animalsArray[i]){
				animalsArray.pop(animal);
			}
		}

		//Animal is always pushed into the array and then the text input box cleared out.
		animalsArray.push(animal);
	 	animalInput.val("");

    	console.log(animal);
    	console.log(animalsArray);

    	//Now that animalsArray is populated, loop number of times equal to the length of that array
    	for (i=0; i<animalsArray.length; i++){
	    	//Generate a new button with the attribute "data-animal", bootstrap classes and text containing the search terms
	    	var newButton = $("<button>");
	    	newButton.attr("data-animal", animalsArray[i]);
	    	newButton.addClass("btn btn-primary");
	    	newButton.html(animalsArray[i]);

	    	//Append the buttons to the page
	    	animalButtonsList.append(newButton);
    	}

	 	//When any button tag is clicked...
	 	$("button").on("click", function(){
	 		console.log("it works");

	 		//Empty out gifs that may be there
	 		gifDiv.empty();

	 		//The search terms are set to the data-animal value set in the addAnimalButton button
			var animalSearch = $(this).data('animal');
	 		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&api_key=dc6zaTOxFJmzC&limit=10";


			$.ajax({url: queryURL, method: 'GET'}).done(function(response){

				console.log(queryURL);
				console.log(response);

				var results = response.data;

				for (i=0; i<results.length; i++){

					//Create div for individual gifs with CSS class
					var animalDiv = $("<div>");
					animalDiv.addClass("adjustGif");

					//Make a paragraph tag and populate it with rating
				    var p = $("<p>");
				   	p.text("Rating: " + results[i].rating);

				   	//Make an image tag and give it src, data-state, data-still and data-animate attributes
					var imageTag = $("<img>");
					imageTag.attr("src", results[i].images.fixed_height_still.url);
					imageTag.attr("data-still", results[i].images.fixed_height_still.url);
					imageTag.attr("data-animate", results[i].images.fixed_height.url);

					//Append both rating and the gif to the page
					animalDiv.append(p);
					animalDiv.append(imageTag);


					gifDiv.prepend(animalDiv);
				}

				//Toggle for playing and stopping the gif animation
				$("img").on("click", function(){
					var state = $(this).attr("data-state");

					if (state == 'still'){
						$(this).attr('src', $(this).data('animate'));
						$(this).attr('data-state', 'animate');
					}
					else{
						$(this).attr('src', $(this).data('still'));
						$(this).attr('data-state', 'still');
					}
				})
			})
	 	})

	 	//Can now press enter/return on the input box without the page refreshing
	 	return false;


 	})

})




